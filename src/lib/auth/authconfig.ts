import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import LinkedIn from 'next-auth/providers/linkedin';
import EmailProvider from 'next-auth/providers/email';
import type { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import type { Adapter } from 'next-auth/adapters';
import { Resend } from 'resend';
import { clientPromise } from '@/lib/db/mongoclient';
import { User } from '@/models/User';
import config from '@/config';
import { SignInEmail } from '@/email-template/emails/signin-email';
import { IUser } from '@/types/user';

// if (
//   !process.env.GITHUB_CLIENT_ID ||
//   !process.env.GITHUB_CLIENT_SECRET ||
//   !process.env.GOOGLE_CLIENT_ID ||
//   !process.env.GOOGLE_CLIENT_SECRET ||
//   !process.env.RESEND_API_KEY
// ) {
//   throw new Error('Auth required env variables are not set');
// }

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,

  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: config.auth.signin.redirect,
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      from: config.email.noreply,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY!);
          await resend.emails.send({
            from: provider.from!,
            to: identifier,
            subject: config.email.signin.subject,
            react: SignInEmail({ url, identifier }),
          });
        } catch (error) {
          console.error('Failed to send verification email:', error);
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        let dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          const newUser: Partial<IUser> = {
            email: user.email,
            name: user.name || '',
            avatar: user.image || 'default-avatar.png',
            provider: account?.provider || 'email',
            subscriptionPlan: 'free',
          };
          dbUser = await User.create(newUser);
        }

        // Update last login for all sign-in methods
        await User.findByIdAndUpdate(dbUser._id, {
          lastLogin: new Date(),
          // Update name and avatar if provided and different from stored values
          ...(user.name && user.name !== dbUser.name && { name: user.name }),
          ...(user.image && user.image !== dbUser.avatar && { avatar: user.image }),
        });

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.subscriptionPlan = user.subscriptionPlan;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.email = token.email as string;
          session.user.name = token.name as string;
          session.user.image = token.picture as string;
          session.user.subscriptionPlan = token.subscriptionPlan as string;
        }
      } catch (error) {
        console.error('Error in session callback:', error);
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? `${baseUrl}${config.auth.signin.redirect}` : baseUrl;
    },
  },

  debug: process.env.NODE_ENV !== 'production',
};

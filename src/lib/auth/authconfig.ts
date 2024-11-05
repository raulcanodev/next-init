import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';
import config from '@/config';
import EmailProvider, { SendVerificationRequestParams } from 'next-auth/providers/email';
import { Resend } from 'resend';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from '@/lib/db/mongoclient';
import { SignInEmail } from '@/email-template/emails/signin-email';

if (
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET
) {
  throw new Error('Auth required env variables are not set');
}

interface NextAuthOptionsExtended extends NextAuthOptions {
  adapter: ReturnType<typeof MongoDBAdapter>;
}

export const authOptions: NextAuthOptionsExtended = {
  adapter: MongoDBAdapter(client),

  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/dashboard/page',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      /**
       * We set to true allowDangerousEmailAccountLinking for 2 reasons:
       * 1. We want to allow users to link their email account to their Google account
       * 2. By setting this to false, we get an security error:
       *  "To confirm your identity, sign in with the same account you used originally."
       *  This is to protect your account and prevent unauthorized access, we can set to true because we are using a
       *  custom email provider, people who doesn't have access to the email account can't login.
       */
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      from: config.email.noreply,
      sendVerificationRequest: async (params: SendVerificationRequestParams) => {
        const { identifier, url, provider } = params;
        try {
          const resend = new Resend(process.env.RESEND_API_KEY!);
          await resend.emails.send({
            from: provider.from,
            to: identifier,
            subject: config.email.signin.subject,
            react: SignInEmail({ url, identifier }),
          });
        } catch (error) {
          console.log({ error });
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
    async redirect({ url, baseUrl }) {

      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard/page`;
      }
      return baseUrl;
    }
  },

  debug: process.env.NODE_ENV === 'development',
};

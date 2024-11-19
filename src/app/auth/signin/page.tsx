'use client';
import {
  AcceptConditions,
  GoogleSignInButton,
  GithubSignInButton,
  EmailSignIn,
  LinkedInSignInButton,
} from '../components';
import config from '@/config';

export default function SignIn() {
  return (
    <>
      <div>
        <h2 className="text-2xl text-center font-bold text-foreground">
          Welcome to {config.appName}
        </h2>
        <p className="text-center mt-3 text-muted-foreground">
          {config.auth.signin.description}
        </p>
      </div>

      <hr className="mb-3 mt-6" />

      <div className="space-y-3">
        <GithubSignInButton />
        <GoogleSignInButton />
        <LinkedInSignInButton />
        <EmailSignIn />
        <AcceptConditions />
      </div>
    </>
  );
}
'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui";
import config from '@/config';

export default function SignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Sign out of {config.appName}
      </h2>
      <p className="text-muted-foreground mb-8">
        Are you sure you want to sign out?
      </p>
      <div className="space-x-4">
        <Button
          onClick={handleSignOut}
          disabled={isSigningOut}
          variant="outline"
        >
          {isSigningOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </div>
    </div>
  );
}
'use client';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function AuthError() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-destructive mb-4">Authentication Error</h2>
      <p className="text-muted-foreground mb-6">
        There was an error while trying to authenticate you. Please try again.
      </p>
      <Button variant="link" asChild>
        <Link href="/auth/signin">
          Try signing in again
        </Link>
      </Button>
    </div>
  );
}
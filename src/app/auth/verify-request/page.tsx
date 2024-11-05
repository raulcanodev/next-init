import Link from 'next/link';
import { Button } from "@/components/ui/";

export default function VerifyRequest() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-primary mb-4">Check Your Email</h2>
      <p className="text-muted-foreground mb-6">
        A sign in link has been sent to your email address. Please check your inbox and click the link to continue.
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        If you don&apos;t see the email, check your spam folder.
      </p>
      <Button variant="link" asChild>
        <Link href="/auth/signin">
          Return to sign in
        </Link>
      </Button>
    </div>
  );
}
import { ThemeSwitcher, Button } from '@/components/ui';
import { GitHubIcon } from '@/components/assets/svg';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <ThemeSwitcher />
          <h1 className="text font-bold font-bricolage mb-2">Next Init</h1>
          <h1 className="text-xl font-bold font-bricolage mb-2">Next Init</h1>
          <h1 className="text-2xl font-bold font-bricolage mb-2">Next Init</h1>
          <h1 className="text-3xl font-bold font-bricolage mb-2">Next Init</h1>
          <h1 className="text-4xl font-bold font-bricolage mb-2">Next Init</h1>
          <h1 className="text-5xl font-bold font-bricolage mb-2">Next Init</h1>
        </div>

        <div className="space-y-4 space-x-2 mb-8">
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>

          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link
              href="https://next-init.vercel.app/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next Init Docs
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Get started by editing <code className="font-mono font-bold">app/page.tsx</code>
        </p>

        <a
          href="https://github.com/raulcanodev/next-init"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground my-5 hover:underline"
        >
          Star & Contribute on GitHub
          <GitHubIcon className="inline-block w-4 h-4 ml-2" />
        </a>
      </div>
    </main>
  );
}

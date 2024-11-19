import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui';
import { GoogleIcon, GitHubIcon, LinkedInIcon } from '@/components/assets/svg';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export function GoogleSignInButton() {
  return (
    <Button 
      onClick={() => signIn('google')} 
      className="w-full mt-4 bg-white text-gray-700 border border-gray-300 hover:shadow-md hover:border-gray-400 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-6 text-center inline-flex items-center justify-center transition-all duration-200 dark:bg-white dark:text-gray-700 hover:text-white hover:dark:text-black dark:border-gray-300 dark:hover:border-gray-400 dark:focus:ring-gray-100"
    >
      <GoogleIcon width={20} height={20} className='mr-2' />
      Sign in with Google
    </Button>
  );
}

export function GithubSignInButton() {
  return (
    <Button
      onClick={() => signIn('github')}
      className="w-full mt-4 bg-black text-white hover:bg-gray-950 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-6 text-center inline-flex items-center justify-center dark:hover:bg-gray-950 dark:focus:ring-gray-500 transition-all duration-200"
    >
      <GitHubIcon width={21} height={21} fill="white" className='mr-2' />
      Sign in with GitHub
    </Button>
  );
}

export function LinkedInSignInButton() {
  return (
    <Button
      onClick={() => signIn('linkedin')}
      className="w-full mt-4 bg-[#0077B5] text-white hover:bg-[#00669D] focus:ring-4 focus:ring-[#00405C]/50 font-medium rounded-lg text-sm px-5 py-6 text-center inline-flex items-center justify-center transition-all duration-200"
    >
      <LinkedInIcon width={20} height={20} className='mr-2' />
      Sign in with LinkedIn
    </Button>
  );
}

export function EmailSignIn() {
  const [showEmailOption, setShowEmailOption] = useState(false);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      startTransition(async()=>{
        await signIn("email", {
          email,
        })
      })
    } catch (error) {
      toast.error("Error sending email, try again");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-3 mt-4"
    >
      {showEmailOption && (
        <div>
          <input
            id="email"
            name="email"
            autoFocus={true}
            type="email"
            placeholder="email@email.com"
            autoComplete="email"
            required
            value={email}
            disabled={isPending}
            onChange={(e) => {setEmail(e.target.value)}}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200"
          />
        </div>
      )}
      <Button 
        className={`w-full font-medium rounded-lg text-sm px-5 py-6 text-center transition-all duration-200 
          ${showEmailOption 
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 dark:bg-primary dark:hover:bg-primary/90 dark:focus:ring-primary/30' 
            : 'bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground focus:ring-4 focus:ring-ring/30 dark:bg-background dark:text-foreground dark:border-input dark:hover:bg-accent dark:hover:text-accent-foreground dark:focus:ring-ring/30'
          }`
        }
        disabled={isPending}
        {...(!showEmailOption && {
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            setShowEmailOption(true);
          },
        })}
      >
        {isPending
          ? 'Sending...'
          : showEmailOption 
            ? 'Send Magic Link' 
            : 'Continue with Email'
        }
      </Button>
    </form>
  )
}
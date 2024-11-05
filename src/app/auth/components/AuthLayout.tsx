import { Toaster } from "@/components/ui/sonner"
import Link from 'next/link'
import Image from 'next/image'
import { cn } from "@/lib/utils"
import config from '@/config'

interface AuthLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <Toaster position="top-center" />
      <div className={cn("w-full max-w-md", className)}>
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center justify-center w-full">
            <Image 
              src="/icon.png"
              alt={config.appName}
              width={50}
              height={50}
              className="w-[50px] h-[50px]"
            />
          </Link>
        </div>
        <div className="bg-card text-card-foreground rounded-lg p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
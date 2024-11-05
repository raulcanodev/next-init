'use client';

// https://next-auth.js.org/getting-started/client#options
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import config from '@/config';

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme={config.defaultTheme} enableSystem>
        {children}
        </ThemeProvider>
    </SessionProvider>
  );
};

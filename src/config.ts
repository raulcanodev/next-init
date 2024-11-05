const config = {
  appName: 'Next Init',
  appDescription: 'Next Init, free Next.js 15 boilerplate, with Tailwind CSS, TypesScript, ESLint, Prettier, MongoDB, ShadcnUI, Next Auth, and more.',
  domainName: 'next-init.vercel.app',
  domainUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cvpage.to',
  defaultTheme: 'dark',
  social: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  auth: {
    signin: {
      modalInfo: 'The best boilerplate for Next.js 15',
    },
  },
  lemonsqueezy: {
    price: '9€',
    productID: process.env.NODE_ENV === 'development' ? '0000' : '0000',
  },
  personal: {
    name: 'Raúl',
    title: 'Founder of Next Init & Web Developer',
    description:
      'I am a web developer, I love to create websites and web applications. I am the founder of Next Init, a free Next.js 15 boilerplate with Tailwind CSS, TypeScript, ESLint, Prettier, MongoDB, ShadcnUI, Next Auth and more.',
    github: 'https://github.com/raulcanodev',
    linkedin: 'https://www.linkedin.com/in/raulcano-in/',
    email: 'rawraul@outlook.com',
    twitter: 'https://x.com/raulcanodev',
  },
  email: {
    // https://resend.com/
    // @/email-template/emails/signin-email.tsx
    noreply: 'Next Init <noreply@yourdomain.com>',
    signin: {
      subject: `Login Link to your Next Init Account.`,
      content: 'Please click the magic button below to sign in to your account.',
      buttonColor: '#000',
      logo: 'icon.png',
    }
  }
};

export default config;

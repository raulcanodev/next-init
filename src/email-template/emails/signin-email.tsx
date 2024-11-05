import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";
import config from "@/config";

interface SignInEmailProps {
  userFirstname?: string;
  url: string;
  identifier: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000/";
  
  export const SignInEmail = ({ userFirstname = "User", url, identifier }: SignInEmailProps) => (
  <Html>
    <Head />
    <Preview>Sign in to {config.appName} - Your personal link is ready</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}${config.email.signin.logo}`}
          width={40}
          height={40}
          alt={config.appName}
          style={logo}
        />
        <Text style={heading}>Welcome to {config.appName}!</Text>
        <Text style={paragraph}>
          {config.email.signin.content}
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={url}>
            Sign In to {config.appName}
          </Button>
        </Section>
        <Text style={paragraph}>
          Or copy and paste this URL into your browser:
        </Text>
        <Link style={link}>
          {url}
        </Link>
        <Text style={paragraph}>
          If you didn&apos;t request this email, you can safely ignore it.
        </Text>
        <Text style={paragraph}>
          Best regards,
          <br />
          The {config.appName} team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          This email was intended for {identifier}. 
          <br />
          © {new Date().getFullYear()} {config.appName}. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

SignInEmail.PreviewProps = {
  userFirstname: "Raul",
  url: "https://example.com/signin?token=abc123",
  identifier: "raul@example.com",
} as SignInEmailProps;

export default SignInEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff !important",
  margin: "0 auto",
  padding: "20px",
  marginBottom: "64px",
  maxWidth: "560px",
  borderRadius: "15px",
  border: "1px solid #e8e8e8",
};

const logo = {
  margin: "0 auto",
  marginBottom: "24px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  padding: "0",
  color: "#000",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#404040",
  margin: "16px 0",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: config.email.signin.buttonColor,
  borderRadius: "10px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  fontWeight: "bold",
};

const link = {
  fontSize: "14px",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "16px",
};
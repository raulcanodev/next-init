"use client";
import React from 'react';
import { BackButton, Section } from '../_components/';
import config from '@/config';

const PrivacyPolicy = () => {
  const { appName } = config;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto  overflow-hidden">
        <div className="mt-8 text-center">
          <BackButton/>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

          <Section title="1. Introduction">
            <p>
              Your privacy is important to us. It is {appName}&apos;s policy to respect your privacy
              regarding any information we may collect from you across our website and other sites
              we own and operate.
            </p>
          </Section>

          <Section title="2. Information Collection">
            <p>
              We only ask for personal information when we truly need it to provide a service to
              you. We collect it by fair and lawful means, with your knowledge and consent. We also
              let you know why we&apos;re collecting it and how it will be used.
            </p>
          </Section>

          <Section title="3. Google Account Integration">
            <p>
              You can sign up with your Google account so your {appName} account username will be
              prefilled with your name and your public profile picture.
            </p>
          </Section>

          <Section title="4. Data Retention">
            <p>
              We only retain collected information for as long as necessary to provide you with your
              requested service. What data we store, we&apos;ll protect within commercially acceptable
              means to prevent loss, theft, unauthorized access, disclosure, copying, use, or
              modification.
            </p>
          </Section>

          <Section title="5. Data Sharing">
            <p>
              We don&apos;t share any personally identifying information publicly or with third parties,
              except when required to by law.
            </p>
          </Section>

          <Section title="6. Data Control and Processing">
            <p>
              We act in the capacity of a data controller and a data processor with regard to the
              personal data processed through {appName} and its services in terms of the applicable
              data protection laws, including the EU General Data Protection Regulation (GDPR).
            </p>
          </Section>

          <Section title="7. External Links">
            <p>
              Our website may link to external sites that are not operated by us. Please be aware
              that we have no control over the content and practices of these sites, and cannot
              accept responsibility or liability for their respective privacy policies.
            </p>
          </Section>

          <Section title="8. Refusal of Information">
            <p>
              You are free to refuse our request for your personal information, with the
              understanding that we may be unable to provide you with some of your desired services.
            </p>
          </Section>

          <Section title="9. Acceptance">
            <p>
              Your continued use of our website will be regarded as acceptance of our practices
              around privacy and personal information. If you have any questions about how we handle
              user data and personal information, feel free to contact us.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

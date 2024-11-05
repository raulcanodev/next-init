"use client";
import React from 'react';
import { Section, BackButton } from '../_components';
import config from '@/config';

const TermsAndConditions: React.FC = () => {
  const {appName} = config;
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto overflow-hidden">
        <div className="mt-8 text-center">
          <BackButton/>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Terms and Conditions
          </h1>

          <Section title="1. Introduction">
            <p>
              By using {appName}, you confirm your acceptance of, and agree to be bound by, these terms
              and conditions.
            </p>
          </Section>

          <Section title="2. Agreement to Terms and Conditions">
            <p>
              This Agreement takes effect on the date on which you first use the {appName} application.
            </p>
          </Section>

          <Section title="3. Unlimited Access Software License with Termination Rights">
            <p>
              The {appName} Software License facilitates the acquisition of {appName} software through a
              single purchase, granting users unrestricted and perpetual access to its comprehensive
              functionalities. Tailored for professionals, job seekers, and independent creators,
              {appName} empowers users to create online CVs and digital portfolios.
            </p>
            <p>
              This license entails a straightforward and flexible arrangement, exempting users from
              recurring fees or subscriptions. However, it is important to acknowledge that the
              licensor retains the right to terminate the license without conditions or
              prerequisites.
            </p>
          </Section>

          <Section title="4. Disclaimer">
            <p>
              It is not warranted that {appName} will meet your requirements or that its operation will
              be uninterrupted or error-free. All express and implied warranties or conditions not
              stated in this Agreement (including without limitation, loss of profits, loss or
              corruption of data, business interruption, or loss of contracts), so far as such
              exclusion or disclaimer is permitted under the applicable law, are excluded and
              expressly disclaimed.
            </p>
          </Section>

          {/* Nueva sección para la política de no reembolsos */}
          <Section title="5. No Refunds Policy">
            <p>
              Once a purchase or subscription is made for any of {appName}&apos;s services or plans, no refunds will be issued under any circumstances. We encourage users to review the available options thoroughly before making a purchase. By proceeding with the payment, you agree to this no refund policy.
            </p>
          </Section>

          <Section title="6. Warranties and Limitation of Liability">
            <p>
              {appName} does not give any warranty, guarantee, or other term as to the quality, fitness
              for purpose, or otherwise of the software. {appName} shall not be liable to you by reason
              of any representation (unless fraudulent), or any implied warranty, condition, or
              other term, or any duty at common law, for any loss of profit or any indirect,
              special, or consequential loss, damage, costs, expenses, or other claims.
            </p>
            <p>
              {appName}&apos;s liability is limited to the amount actually paid by you for your services or
              software.
            </p>
          </Section>

          <Section title="7. Responsibilities">
            <p>
              {appName} is not responsible for what the user does with the user-generated content. The
              content created, shared, and distributed through {appName} is the sole responsibility of
              the user.
            </p>
          </Section>

          <Section title="8. Governing Law">
            <p>
              This Agreement is governed by the laws of your country of residence. You acknowledge
              that no joint venture, partnership, employment, or agency relationship exists between
              you and {appName} as a result of your use of these services.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

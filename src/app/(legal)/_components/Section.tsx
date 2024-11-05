import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{title}</h2>
      <div className="text-gray-600 dark:text-gray-300 space-y-4">
        {children}
      </div>
    </section>
  );
};
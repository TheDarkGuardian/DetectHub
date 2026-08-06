import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'DetectHub - Digital Forensics & Computer Integrity Platform',
  description: 'Enterprise digital forensics, computer integrity analysis, transparent system info and forensic artifact reporting.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#09090B] text-[#FAFAFA] antialiased selection:bg-zinc-800 selection:text-zinc-100">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppShell from '@/components/layout/AppShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'HealthWorld - Your Virtual Health Companion',
    template: '%s | HealthWorld',
  },
  description: 'HealthWorld provides a virtual hospital experience with symptom checking, health resources, prescription management, and client profiles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  );
}

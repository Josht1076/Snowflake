import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';
import SkipLink from '@/components/common/SkipLink';

export const metadata: Metadata = {
  title: 'Snowflake Novel Planner',
  description: 'A modern planning tool for outlining novels using the Snowflake Method + Save the Cat',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}


import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'MP-GEA | Madhya Pradesh Government Engineers’ Association',
  description: 'Official digital association platform for over 2,000 serving engineers of the Government of Madhya Pradesh. Transparent cadre governance, digital credentials, government orders, and service representation.',
  keywords: ['MP-GEA', 'Government Engineers', 'Madhya Pradesh', 'PWD MP', 'WRD MP', 'PHED MP', 'Engineers Association Bhopal'],
  authors: [{ name: 'MP-GEA Secretariat' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mpgea.org'),
  openGraph: {
    title: 'Madhya Pradesh Government Engineers’ Association (MP-GEA)',
    description: 'Official digital office and portal of MP Government Engineers.',
    siteName: 'MP-GEA',
    locale: 'en_IN',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col justify-between selection:bg-teal-100 selection:text-teal-900">
        <Header
          user={
            session
              ? {
                  name: session.memberName ?? null,
                  email: session.email,
                  roles: session.roles,
                }
              : null
          }
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

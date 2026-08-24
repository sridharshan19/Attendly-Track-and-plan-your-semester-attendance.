import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Attendance Calculator – Calculate Your Attendance & Safe Bunks | Attendly',
  description:
    'Calculate your current attendance percentage, find how many classes you can safely skip/bunk, and discover how many consecutive classes you need to attend to reach your target goal.',
  keywords: [
    'attendance calculator',
    'bunk calculator',
    '75 percent attendance calculator',
    'college attendance planner',
    'safe skips calculator',
    'class attendance projection',
    'student attendance tracker',
  ],
  authors: [{ name: 'Attendly Team' }],
  creator: 'Attendly',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://attendly.app',
    title: 'Attendance Calculator – Calculate Your Attendance & Safe Bunks',
    description:
      'Know your attendance. Plan your classes. Calculate current percentage, safe skips, and required classes instantly.',
    siteName: 'Attendly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Attendance Calculator – Calculate Your Attendance & Safe Bunks',
    description:
      'Know your attendance. Plan your classes. Calculate current percentage, safe skips, and required classes instantly.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Attendly',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    description:
      'Calculate attendance percentage, safe skips, and required consecutive classes to maintain academic goals.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('attendly_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'light' || (!stored && !prefersDark)) {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-sky-500 selection:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}

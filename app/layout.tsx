import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://predictpro-ai.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PredictPro AI — AI Football Predictions & Live Scores',
    template: '%s | PredictPro AI',
  },
  description: 'AI-powered football match predictions, win probabilities, confidence ratings, live scores and league standings for Premier League, Champions League, World Cup and more.',
  keywords: [
    'football predictions',
    'AI football predictions',
    'match predictions today',
    'Premier League predictions',
    'Champions League predictions',
    'World Cup predictions',
    'football betting tips',
    'win probability',
    'football analysis',
    'AFCON predictions',
  ],
  authors: [{ name: 'PredictPro AI' }],
  creator: 'PredictPro AI',
  publisher: 'PredictPro AI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'PredictPro AI',
    title: 'PredictPro AI — AI Football Predictions & Live Scores',
    description: 'AI-powered football predictions with win probabilities and confidence scores for every match today.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PredictPro AI — Football Predictions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PredictPro AI — AI Football Predictions',
    description: 'AI-powered football predictions with win probabilities and confidence scores.',
    images: ['/og-image.png'],
    creator: '@predictproai',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

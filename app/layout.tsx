import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ToolVerse - 100+ Free Online Utility Tools',
  description: 'Access 100+ free online tools for text processing, development, image manipulation, calculations, utilities, and more. No signup required.',
  keywords: [
    'online tools',
    'text tools',
    'developer tools',
    'calculator',
    'JSON formatter',
    'image compressor',
    'password generator',
    'free tools',
  ],
  openGraph: {
    title: 'ToolVerse - Your Complete Toolkit',
    description: 'Free online tools for developers and everyone. JSON formatter, image compressor, code minifier, and much more.',
    type: 'website',
    url: 'https://toolverse.app',
  },
  icons: {
    icon: [
      {
        url: '/toolverse_logo.png',
      },
    ],
    apple: '/toolverse_logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head />
      <body className="font-sans antialiased bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

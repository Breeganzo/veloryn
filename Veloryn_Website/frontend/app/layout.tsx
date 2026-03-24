import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Veloryn | Intelligence for SMBs',
  description: 'AI-powered analytics tools that help small and medium businesses understand their customers, predict outcomes, and take action.',
  keywords: ['AI', 'analytics', 'SMB', 'lead scoring', 'churn prediction', 'causal inference'],
  authors: [{ name: 'Veloryn' }],
  openGraph: {
    title: 'Veloryn | Intelligence for SMBs',
    description: 'AI-powered analytics for SMBs',
    url: 'https://veloryn.dev',
    siteName: 'Veloryn',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veloryn | Intelligence for SMBs',
    description: 'AI-powered analytics for SMBs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

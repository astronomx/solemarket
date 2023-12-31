import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Solemarket',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>

      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

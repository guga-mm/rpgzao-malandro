import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'RPGzão Malandro',
  description: 'Um portal para os nerdolas do RPGzão de malandro que adoram jogar RPG!',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: 'image/icon/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'image/icon/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: 'image/icon/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: 'image/icon/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({subsets: ["latin"], weight: ["400", "700"]})

export const metadata: Metadata = {
  title: 'Widgets',
  description: 'Give immediate and accurate answers to common queries using widgets.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

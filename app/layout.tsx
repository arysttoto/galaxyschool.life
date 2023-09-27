import './css/style.css'; 

import { Inter } from 'next/font/google';

import Nav from '@/components/ui/nav';
import Banner from '@/components/banner';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Galaxy School Life',
  description: `Let's elevate Galaxy school's community together!`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Nav /> 
          {children} 
          <Banner />
          <Analytics />
        </div>
      </body>
    </html>
  )
}

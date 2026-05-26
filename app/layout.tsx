import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SparklesCore } from '@/app/_components/ui/sparkles'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Jean Rodriguez — Developer & Designer',
  description: 'Portfolio de Jean Rodriguez, desarrollador y diseñador web, software y videojuegos.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <SparklesCore
          id='tsparticlesfullpage'
          background='transparent'
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className='w-full h-full fixed inset-0 pointer-events-none'
          particleColor='#a78bf6'
        />
        <div className="relative w-full">
          {children}
        </div>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import { GovernmentHeader, GovernmentFooter } from '@/components/branding'
import { AuthProvider } from '@/context/AuthContext'
import NarratorGuide from '@/components/NarratorGuide'
import BackgroundSwitcher from '@/components/BackgroundSwitcher'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Surakshya Sarthi - Government of Punjab',
  description: 'Disaster Preparedness Platform by Government of Punjab, Department of Higher Education. Developed by ResQTech.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head></head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="relative min-h-screen flex flex-col overflow-hidden">
          {/* Animated gradient background */}
          <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 animate-[gradientShift_12s_ease_infinite]" />
          {/* Soft glow blobs for depth */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="absolute top-1/3 -right-16 h-72 w-72 rounded-full bg-fuchsia-600/25 blur-3xl" />
            <div className="absolute bottom-[-4rem] left-1/3 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
          </div>
          <BackgroundSwitcher />
          <GovernmentHeader />
          <ErrorBoundary>
            <AuthProvider>
              <main className="flex-1 backdrop-blur-[1px]/[var(--tw-blur)] pt-16">
                {children}
              </main>
            </AuthProvider>
          </ErrorBoundary>
          <NarratorGuide />
          <GovernmentFooter />
        </div>
        
      </body>
    </html>
  )
}

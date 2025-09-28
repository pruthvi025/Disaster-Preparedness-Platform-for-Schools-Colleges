'use client'

import { usePathname } from 'next/navigation'
import StarsBackground from '@/components/StarsBackground'

export default function BackgroundSwitcher() {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === '/home'
  if (!isHome) return null
  return <StarsBackground />
}



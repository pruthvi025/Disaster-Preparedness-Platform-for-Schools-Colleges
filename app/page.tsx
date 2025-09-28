'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navigation />
      <main className="">
        <Hero />
      </main>
    </div>
  )
}

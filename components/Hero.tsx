'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Html, Billboard } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useMemo, useRef, useState, useEffect } from 'react'

function RotatingSystem() {
  const rotatingRef = useRef<any>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  useFrame((_, delta) => {
    if (rotatingRef.current) rotatingRef.current.rotation.y += delta * 0.2
  })

  const surfaceR = 1.2 + 0.06
  const configs = useMemo(() => (
    [
      { text: 'Prevent', lat: 20 * Math.PI / 180, lon: 0 },
      { text: 'Prepare', lat: -10 * Math.PI / 180, lon: 120 * Math.PI / 180 },
      { text: 'Respond', lat: 15 * Math.PI / 180, lon: 240 * Math.PI / 180 },
    ]
  ), [])

  return (
    <group ref={rotatingRef}>
      {/* Earth */}
      <Sphere args={[1.2, 64, 64]}> 
        <meshStandardMaterial color="#5b9bd5" metalness={0.3} roughness={0.4} />
      </Sphere>
      <Sphere args={[1.22, 64, 64]}> 
        <meshStandardMaterial color="#ffffff" wireframe opacity={0.2} transparent />
      </Sphere>
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#7c3aed" />

      {/* Labels that rotate with Earth and always face camera; visible even on backside */}
      {configs.map((cfg, idx) => {
        const cosLat = Math.cos(cfg.lat)
        const sinLat = Math.sin(cfg.lat)
        const cosLon = Math.cos(cfg.lon)
        const sinLon = Math.sin(cfg.lon)
        const x = surfaceR * cosLat * cosLon
        const y = surfaceR * sinLat
        const z = surfaceR * cosLat * sinLon
        return (
          <group key={idx} position={[x, y, z]}>
            <Billboard follow>
              <Html center transform distanceFactor={6} style={{ pointerEvents: 'auto' }}>
                <div
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex((i) => (i === idx ? null : i))}
                  className={`px-3 py-1 rounded-full backdrop-blur-sm border shadow-sm transition-transform duration-200 ${
                    hoveredIndex === idx ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.25)',
                    boxShadow: hoveredIndex === idx ? '0 0 16px rgba(147,197,253,0.45)' : '0 0 12px rgba(255,255,255,0.18)'
                  }}
                >
                  <span className="text-xs md:text-sm drop-shadow-[0_2px_6px_rgba(255,255,255,0.35)]">{cfg.text}</span>
                </div>
              </Html>
            </Billboard>
          </group>
        )
      })}
    </group>
  )
}

function HoverablePillLabel({ text }: { text: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.12 : 1}
    >
      {/* Translucent pill container always billboarded */}
      <Html center transform distanceFactor={6}>
        <div className="px-3 py-1 rounded-full bg-white/12 text-white backdrop-blur-sm border border-white/25 shadow-[0_0_12px_rgba(255,255,255,0.18)] transition-transform">
          <span className="text-xs md:text-sm drop-shadow-[0_2px_6px_rgba(255,255,255,0.35)]">{text}</span>
        </div>
      </Html>
    </group>
  )
}

function ResponsiveGroup({ children }: { children: React.ReactNode }) {
  const { size } = useThree()
  const scale = size.width < 640 ? 0.85 : size.width < 1024 ? 1 : 1.1
  return <group scale={scale}>{children}</group>
}

export default function Hero() {
  const sphereRef = useRef(null)
  const phrases = [
    'Learn. Prepare. Respond. Survive.',
    'Your training today saves lives tomorrow.',
    'Knowledge is the strongest shield.',
    'Be disaster-ready, be a hero.',
    'Prepared minds build resilient communities.'
  ]
  const [phraseIndex, setPhraseIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % phrases.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [phrases.length])
  return (
    <section className="relative overflow-hidden">
      {/* Subtle hero-local glow layers that blend with global gradient */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-800/30 animate-[gradientShift_18s_ease_infinite]" />
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(1200px_600px_at_10%_10%,rgba(99,102,241,0.20),transparent_60%),radial-gradient(900px_500px_at_85%_75%,rgba(236,72,153,0.16),transparent_60%)]" />
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Text content */}
        <div className="w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
            style={{
              textShadow: '0 0 14px rgba(99,102,241,0.55), 0 0 28px rgba(139,92,246,0.45)'
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Surakshya Sarthi
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4"
          >
            <div className="inline-block mx-auto text-center">
              <p className="text-xl md:text-2xl font-semibold text-gray-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                Disaster Preparedness Platform for Schools & Colleges
              </p>
              <div className="mt-2 h-[2px] w-full rounded-full bg-gradient-to-r from-purple-400 to-blue-500" />
            </div>
          </motion.div>

          {/* Animated tagline cycling */}
          <div className="mt-6 min-h-[32px] md:min-h-[40px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="text-base md:text-lg text-gray-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
              >
                {phrases[phraseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-login'))}
              className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-2xl
                         bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-900/30 ring-1 ring-white/15
                         hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-900/35 transition-transform duration-200"
            >
              Get Started
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="pointer-events-none absolute -inset-px rounded-2xl blur-md bg-gradient-to-r from-indigo-400/30 to-fuchsia-400/20 opacity-60" />
            </button>
          </motion.div>
        </div>

        {/* Right: 3D Canvas with subtle icons */}
        <div className="relative h-[420px] md:h-[600px]">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 3, 2]} intensity={0.8} />
            <ResponsiveGroup>
              <RotatingSystem />
            </ResponsiveGroup>

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={3.5}
              maxDistance={8}
              autoRotate
              autoRotateSpeed={0.2}
            />
          </Canvas>
        </div>
      </div>

      {/* Local CSS for typing and blink animations */}
      <style jsx>{`
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink { 50% { border-color: transparent } }
      `}</style>
    </section>
  )
}



'use client'

import Image from 'next/image'

interface PunjabEmblemProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function PunjabEmblem({ size = 'md', className = '' }: PunjabEmblemProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img
        src="/images/panjab.png"
        alt="Government of Punjab Official Emblem"
        className="w-full h-full object-contain"
      />
    </div>
  )
}

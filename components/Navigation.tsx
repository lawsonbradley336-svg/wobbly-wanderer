'use client'

import Link from 'next/link'
import { Map, List, Zap, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const navItems = [
    { icon: Map, label: 'Map', href: '#' },
    { icon: List, label: 'List', href: '#' },
    { icon: Zap, label: 'Challenges', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ]

  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-dark-pub border-t border-gray-700 z-40">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center py-3 px-2 text-gray-400 hover:text-amber-glow transition-colors duration-300 border-t-2 border-transparent hover:border-amber-glow"
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

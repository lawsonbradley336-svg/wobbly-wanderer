'use client'

import { ReactNode, useState, useEffect } from 'react'
import Header from './Header'
import Navigation from './Navigation'
import ScrollToTop from './ScrollToTop'

interface LayoutProps {
  children: ReactNode
  soberMode: boolean
  onSoberModeChange: (mode: boolean) => void
}

export default function Layout({ children, soberMode, onSoberModeChange }: LayoutProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen bg-darker-pub text-white">
      <Header soberMode={soberMode} onSoberModeChange={onSoberModeChange} />
      <main className="flex-1 flex flex-col pb-20 md:pb-0">{children}</main>
      <Navigation />
      <ScrollToTop />
    </div>
  )
}

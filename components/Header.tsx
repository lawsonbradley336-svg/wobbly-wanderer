'use client'

import { useEffect, useState } from 'react'
import { Wine } from 'lucide-react'
import PintGlassAnimation from './PintGlassAnimation'

interface HeaderProps {
  soberMode: boolean
  onSoberModeChange: (mode: boolean) => void
}

export default function Header({ soberMode, onSoberModeChange }: HeaderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-darker-pub via-dark-pub to-darker-pub border-b-2 border-amber-glow shadow-lg shadow-amber-glow/10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="text-4xl animate-bounce">🍺</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-glow to-orange-pub">
                The Wobbly Wanderer
              </h1>
              <p className="text-sm text-gray-400">UK Pub Crawl Generator</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sober Mode Toggle */}
            <button
              onClick={() => onSoberModeChange(!soberMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                soberMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
              title={soberMode ? 'Sober Mode ON - Soft drinks & snacks' : 'Sober Mode OFF - Boozy mode'}
            >
              <Wine size={18} />
              <span className="hidden sm:inline text-sm">{soberMode ? 'Sober' : 'Boozy'}</span>
            </button>

            {/* Wobbling Pint */}
            <div className="hidden md:block">
              <PintGlassAnimation />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

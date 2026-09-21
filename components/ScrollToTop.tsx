'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY > 300)
    }
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 md:bottom-6 right-6 z-40 p-3 bg-amber-glow text-black rounded-full hover:bg-orange-pub shadow-lg shadow-amber-glow/50 transition-all duration-300 hover:scale-110 animate-fade-in"
      title="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  ) : null
}

'use client'

import { useState, useEffect } from 'react'
import { PubCrawl } from '@/types'
import PubCard from './PubCard'
import MapView from './MapView'
import ChallengesView from './ChallengesView'
import { ArrowLeft, MapPin, Clock, MapIcon, List, Zap } from 'lucide-react'
import { calculateCrawlStats } from '@/lib/routeOptimization'

interface CrawlResultsProps {
  crawl: PubCrawl
  onNewCrawl: () => void
  soberMode: boolean
}

type ViewMode = 'list' | 'map' | 'challenges'

export default function CrawlResults({ crawl, onNewCrawl, soberMode }: CrawlResultsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const stats = calculateCrawlStats(crawl.pubs)
  const hoursEstimate = Math.floor(stats.totalTime / 60)
  const minutesEstimate = stats.totalTime % 60

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Crawl Name */}
      <div className="card-pub border-2 border-amber-glow bg-gradient-to-r from-dark-pub to-darker-pub">
        <div className="flex items-start justify-between gap-4 mb-4">
          <button
            onClick={onNewCrawl}
            className="flex items-center gap-2 text-amber-glow hover:text-orange-pub transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-bold">New Crawl</span>
          </button>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-orange-pub text-black font-bold rounded-full text-sm">
              {crawl.vibe.charAt(0).toUpperCase() + crawl.vibe.slice(1)} Vibe
            </span>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-glow to-orange-pub mb-2">
          {crawl.crawlName}
        </h2>
        <p className="text-gray-400 mb-4">{crawl.city} • {crawl.pubs.length} Pubs</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-darker-pub rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <MapPin size={16} /> Distance
            </p>
            <p className="text-xl font-bold text-amber-glow">
              {(stats.totalDistance / 1000).toFixed(1)} km
            </p>
          </div>
          <div className="bg-darker-pub rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Clock size={16} /> Total Time
            </p>
            <p className="text-xl font-bold text-amber-glow">
              {hoursEstimate}h {minutesEstimate}m
            </p>
          </div>
          <div className="bg-darker-pub rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              🍺 Pubs
            </p>
            <p className="text-xl font-bold text-amber-glow">{crawl.pubs.length}</p>
          </div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-2 bg-dark-pub rounded-lg p-2 border border-gray-700">
        <button
          onClick={() => setViewMode('list')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-300 ${
            viewMode === 'list'
              ? 'bg-amber-glow text-black shadow-lg shadow-amber-glow/50'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <List size={18} />
          <span className="hidden sm:inline">List</span>
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-300 ${
            viewMode === 'map'
              ? 'bg-amber-glow text-black shadow-lg shadow-amber-glow/50'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <MapIcon size={18} />
          <span className="hidden sm:inline">Map</span>
        </button>
        <button
          onClick={() => setViewMode('challenges')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-300 ${
            viewMode === 'challenges'
              ? 'bg-amber-glow text-black shadow-lg shadow-amber-glow/50'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Zap size={18} />
          <span className="hidden sm:inline">Challenges</span>
        </button>
      </div>

      {/* Content Views */}
      {viewMode === 'list' && (
        <div className="space-y-4 animate-fade-in">
          {crawl.pubs.map((pub, index) => (
            <div key={pub.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <PubCard
                pub={pub}
                index={index}
                soberMode={soberMode}
              />
            </div>
          ))}
        </div>
      )}

      {viewMode === 'map' && (
        <div className="animate-fade-in">
          <MapView pubs={crawl.pubs} crawlName={crawl.crawlName} />
        </div>
      )}

      {viewMode === 'challenges' && (
        <div className="animate-fade-in">
          <ChallengesView pubs={crawl.pubs} soberMode={soberMode} />
        </div>
      )}
    </div>
  )
}

'use client'

import { PubCrawl } from '@/types'
import { Trash2, MapPin, Users } from 'lucide-react'
import { deleteCrawlFromStorage, getAllCrawlsFromStorage } from '@/lib/storage'
import { useEffect, useState } from 'react'

interface SavedCrawlsProps {
  crawls: PubCrawl[]
  onLoadCrawl: (crawl: PubCrawl) => void
  onRefresh: () => void
}

export default function SavedCrawls({ crawls, onLoadCrawl, onRefresh }: SavedCrawlsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this crawl?')) {
      deleteCrawlFromStorage(id)
      onRefresh()
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-UK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (crawls.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-2xl font-bold text-white mb-2">No Saved Crawls Yet</h2>
        <p className="text-gray-400 mb-6">
          Generate your first pub crawl to save it and come back later!
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Generate Your First Crawl
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-glow to-orange-pub mb-2">
          Your Saved Crawls
        </h2>
        <p className="text-gray-400">
          You have {crawls.length} saved crawl{crawls.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {crawls.map((crawl) => (
          <div
            key={crawl.id}
            className="card-pub group hover:scale-105 transform transition-all duration-300 flex flex-col"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-orange-pub text-black font-bold rounded-full text-sm">
                  {crawl.vibe.charAt(0).toUpperCase() + crawl.vibe.slice(1)}
                </span>
                <button
                  onClick={() => handleDelete(crawl.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  title="Delete crawl"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-amber-glow group-hover:text-orange-pub transition-colors">
                {crawl.crawlName}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{crawl.city}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 bg-darker-pub rounded-lg p-3">
              <div className="text-center">
                <p className="text-xs text-gray-400">Pubs</p>
                <p className="font-bold text-amber-glow text-lg">{crawl.pubs.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Distance</p>
                <p className="font-bold text-orange-pub text-lg">
                  {(crawl.totalDistance / 1000).toFixed(1)}km
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Time</p>
                <p className="font-bold text-green-400 text-lg">
                  {Math.floor(crawl.estimatedTime / 60)}h
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4 flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={14} className="text-amber-glow" />
                <span>{crawl.startingPoint}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Users size={14} className="text-orange-pub" />
                <span>{crawl.pubs.length} stops planned</span>
              </div>
              <p className="text-xs text-gray-500">
                Saved: {formatDate(crawl.createdAt)}
              </p>
            </div>

            {/* Pub List Preview */}
            <div className="mb-4 bg-darker-pub rounded-lg p-3 border border-gray-700">
              <p className="text-xs font-bold text-gray-400 mb-2">Pub Route:</p>
              <div className="space-y-1">
                {crawl.pubs.slice(0, 3).map((pub, i) => (
                  <p key={pub.id} className="text-xs text-gray-300">
                    {i + 1}. {pub.name}
                  </p>
                ))}
                {crawl.pubs.length > 3 && (
                  <p className="text-xs text-gray-500 italic">
                    +{crawl.pubs.length - 3} more...
                  </p>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onLoadCrawl(crawl)}
              className="btn-primary w-full text-center"
            >
              Load Crawl
            </button>
          </div>
        ))}
      </div>

      {/* Export Info */}
      <div className="card-pub text-center">
        <p className="text-sm text-gray-400">
          💡 Your crawls are saved in your browser's storage. They'll persist across sessions!
        </p>
      </div>
    </div>
  )
}

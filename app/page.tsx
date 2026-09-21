'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import CrawlForm from '@/components/CrawlForm'
import CrawlResults from '@/components/CrawlResults'
import SavedCrawls from '@/components/SavedCrawls'
import { PubCrawl } from '@/types'
import { getAllCrawlsFromStorage } from '@/lib/storage'

type ActiveTab = 'generator' | 'saved'

export default function Home() {
  const [activeCrawl, setActiveCrawl] = useState<PubCrawl | null>(null)
  const [savedCrawls, setSavedCrawls] = useState<PubCrawl[]>([])
  const [activeTab, setActiveTab] = useState<ActiveTab>('generator')
  const [soberMode, setSoberMode] = useState(false)

  useEffect(() => {
    const crawls = getAllCrawlsFromStorage()
    setSavedCrawls(crawls)
  }, [])

  const handleCrawlGenerated = (crawl: PubCrawl) => {
    setActiveCrawl(crawl)
    setSavedCrawls((prev) => [crawl, ...prev])
    setActiveTab('generator')
  }

  const handleLoadCrawl = (crawl: PubCrawl) => {
    setActiveCrawl(crawl)
    setActiveTab('generator')
  }

  const handleNewCrawl = () => {
    setActiveCrawl(null)
    setActiveTab('generator')
  }

  return (
    <Layout soberMode={soberMode} onSoberModeChange={setSoberMode}>
      <div className="flex-1">
        {/* Tab Navigation */}
        <div className="sticky top-0 z-40 bg-darker-pub border-b border-gray-700 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-6 py-4 font-bold transition-all duration-300 border-b-2 ${
                  activeTab === 'generator'
                    ? 'border-amber-glow text-amber-glow'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                🍺 Generator
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-6 py-4 font-bold transition-all duration-300 border-b-2 ${
                  activeTab === 'saved'
                    ? 'border-amber-glow text-amber-glow'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                📋 Saved Crawls ({savedCrawls.length})
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'generator' ? (
            <>
              {activeCrawl ? (
                <CrawlResults
                  crawl={activeCrawl}
                  onNewCrawl={handleNewCrawl}
                  soberMode={soberMode}
                />
              ) : (
                <CrawlForm onCrawlGenerated={handleCrawlGenerated} />
              )}
            </>
          ) : (
            <SavedCrawls
              crawls={savedCrawls}
              onLoadCrawl={handleLoadCrawl}
              onRefresh={() => setSavedCrawls(getAllCrawlsFromStorage())}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

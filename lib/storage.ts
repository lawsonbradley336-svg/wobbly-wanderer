import { PubCrawl } from '@/types'

const STORAGE_KEY = 'wobbly-wanderer-crawls'

export function saveCrawlToStorage(crawl: PubCrawl): void {
  if (typeof window === 'undefined') return

  const crawls = getAllCrawlsFromStorage()
  const existingIndex = crawls.findIndex((c) => c.id === crawl.id)

  if (existingIndex > -1) {
    crawls[existingIndex] = crawl
  } else {
    crawls.push(crawl)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(crawls))
}

export function getCrawlFromStorage(id: string): PubCrawl | null {
  if (typeof window === 'undefined') return null

  const crawls = getAllCrawlsFromStorage()
  return crawls.find((c) => c.id === id) || null
}

export function getAllCrawlsFromStorage(): PubCrawl[] {
  if (typeof window === 'undefined') return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function deleteCrawlFromStorage(id: string): void {
  if (typeof window === 'undefined') return

  const crawls = getAllCrawlsFromStorage()
  const filtered = crawls.filter((c) => c.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function saveSoberModePreference(soberMode: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('wobbly-sober-mode', JSON.stringify(soberMode))
}

export function getSoberModePreference(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem('wobbly-sober-mode')
  return stored ? JSON.parse(stored) : false
}

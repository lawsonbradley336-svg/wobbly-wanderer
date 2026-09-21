export type Vibe = 'rowdy' | 'cosy' | 'random' | 'surprise'

export interface Pub {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  openNow: boolean
  rating: number
  reviews: number
  distance: number // in meters
  walkingTimeFromPrevious?: number // in minutes
  description?: string
  onTap?: string[]
  imageUrl?: string
  vibeScore?: number
}

export interface PubCrawl {
  id: string
  city: string
  startingPoint: string
  pubs: Pub[]
  radius: number
  vibe: Vibe
  crawlName: string
  totalDistance: number // in meters
  estimatedTime: number // in minutes
  createdAt: Date
  soberMode: boolean
}

export interface CrawlInput {
  city: string
  startingPoint: string
  numPubs: number
  radius: number
  vibe: Vibe
}

export interface RouteStep {
  from: Pub
  to: Pub
  distance: number
  duration: number
  polyline?: string
}

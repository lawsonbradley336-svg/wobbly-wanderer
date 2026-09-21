import { Pub } from '@/types'

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000 // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Convert meters to walking time (assuming average walking speed of 1.4 m/s)
function metersToWalkingTime(meters: number): number {
  const averageWalkingSpeed = 1.4 // m/s
  return Math.round(meters / averageWalkingSpeed / 60) // returns minutes
}

// Nearest neighbor algorithm for route optimization
export function optimizeRoute(
  pubs: Pub[],
  startLat: number,
  startLng: number
): Pub[] {
  if (pubs.length === 0) return []
  if (pubs.length === 1) return pubs

  const unvisited = [...pubs]
  const route: Pub[] = []
  let currentLat = startLat
  let currentLng = startLng

  while (unvisited.length > 0) {
    let nearestIndex = 0
    let nearestDistance = Infinity

    for (let i = 0; i < unvisited.length; i++) {
      const distance = calculateDistance(
        currentLat,
        currentLng,
        unvisited[i].lat,
        unvisited[i].lng
      )

      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = i
      }
    }

    const nearestPub = unvisited[nearestIndex]
    nearestPub.distance = nearestDistance
    nearestPub.walkingTimeFromPrevious = metersToWalkingTime(nearestDistance)

    route.push(nearestPub)
    currentLat = nearestPub.lat
    currentLng = nearestPub.lng

    unvisited.splice(nearestIndex, 1)
  }

  return route
}

// Calculate total crawl statistics
export function calculateCrawlStats(route: Pub[]) {
  let totalDistance = 0
  let totalTime = 0

  for (const pub of route) {
    if (pub.distance) totalDistance += pub.distance
    if (pub.walkingTimeFromPrevious) totalTime += pub.walkingTimeFromPrevious
  }

  // Add 30 minutes per pub for drinking time
  const drinkingTime = route.length * 30

  return {
    totalDistance,
    walkingTime: totalTime,
    drinkingTime,
    totalTime: totalTime + drinkingTime,
    averagePaceMeters: totalDistance / route.length,
  }
}

// Filter pubs by vibe
export function filterPubsByVibe(pubs: Pub[], vibe: string): Pub[] {
  if (vibe === 'random') return pubs

  // Score pubs based on vibe
  const scored = pubs.map((pub) => {
    let score = pub.rating || 0

    // Rowdy: Higher ratings, more reviews
    if (vibe === 'rowdy') {
      score += pub.reviews * 0.1
      if (pub.description?.toLowerCase().includes('lively')) score += 2
      if (pub.description?.toLowerCase().includes('music')) score += 1
    }

    // Cosy: Lower rating threshold but good quality
    if (vibe === 'cosy') {
      if (pub.description?.toLowerCase().includes('cosy')) score += 3
      if (pub.description?.toLowerCase().includes('quiet')) score += 2
      if (pub.description?.toLowerCase().includes('fireplace')) score += 2
    }

    pub.vibeScore = score
    return pub
  })

  return scored.sort((a, b) => (b.vibeScore || 0) - (a.vibeScore || 0))
}

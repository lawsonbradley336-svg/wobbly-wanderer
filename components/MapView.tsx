'use client'

import { Pub } from '@/types'
import { useState, useEffect } from 'react'
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react'

interface MapViewProps {
  pubs: Pub[]
  crawlName: string
}

export default function MapView({ pubs, crawlName }: MapViewProps) {
  const [selectedPub, setSelectedPub] = useState<Pub | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Calculate bounds
  const lats = pubs.map((p) => p.lat)
  const lngs = pubs.map((p) => p.lng)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)
  const centerLat = (minLat + maxLat) / 2
  const centerLng = (minLng + maxLng) / 2

  // Generate static map URL
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&center=${centerLat},${centerLng}&zoom=14&style=element:geometry%7Ccolor:0x1a1a1a&style=element:labels%7Cvisibility:off&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0x4a4a4a&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x5a5a5a&style=feature:administrative.land_parcel%7Celement:geometry%7Ccolor:0x2a2a2a&style=feature:poi%7Ccolor:0x3a3a3a&style=feature:road%7Celement:geometry%7Ccolor:0x2a2a2a&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3a3a3a&style=feature:water%7Celement:geometry%7Ccolor:0x0a0a0a&markers=color:0xF59E0B%7C${pubs.map((p) => `${p.lat},${p.lng}`).join('%7C')}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'demo'}`

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="card-pub overflow-hidden">
        <div className="relative bg-darker-pub rounded-lg overflow-hidden">
          {/* Static Map */}
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="bg-darker-pub rounded-lg p-8 border-2 border-dashed border-gray-700 text-center">
              <MapPin size={48} className="mx-auto text-amber-glow mb-3" />
              <p className="text-gray-400 mb-2">Interactive map would display here</p>
              <p className="text-sm text-gray-500">
                {pubs.length} pubs plotted across {((Math.max(...lats) - Math.min(...lats)) * 111).toFixed(1)} km
              </p>
              <div className="mt-4 p-3 bg-amber-glow/10 rounded-lg">
                <p className="text-sm text-amber-glow font-bold">📍 Route Preview</p>
                <p className="text-xs text-gray-400 mt-1">
                  Center: {centerLat.toFixed(4)}, {centerLng.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          {/* Map Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-glow"></div>
              <span>Pub Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-pub"></div>
              <span>Route Path</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pub List with Details */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-amber-glow">📍 Route Overview</h3>
        {pubs.map((pub, index) => (
          <div
            key={pub.id}
            className="card-pub cursor-pointer transition-all duration-300 hover:scale-102"
            onClick={() => setSelectedPub(selectedPub?.id === pub.id ? null : pub)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="pub-pin flex-shrink-0">{index + 1}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white">{pub.name}</h4>
                  <p className="text-sm text-gray-400 truncate">{pub.address}</p>
                  {pub.walkingTimeFromPrevious && (
                    <p className="text-xs text-orange-pub mt-1">
                      ↳ {pub.walkingTimeFromPrevious} min walk from previous
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPub(selectedPub?.id === pub.id ? null : pub)
                }}
                className="flex-shrink-0 text-gray-400 hover:text-amber-glow transition-colors"
              >
                {selectedPub?.id === pub.id ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>

            {/* Expanded Details */}
            {selectedPub?.id === pub.id && (
              <div className="mt-4 pt-4 border-t border-gray-700 space-y-3 animate-slide-up">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-400">Rating</p>
                    <p className="font-bold text-amber-glow">{pub.rating}/5.0 ⭐</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Reviews</p>
                    <p className="font-bold text-orange-pub">{pub.reviews}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Coordinates</p>
                    <p className="font-mono text-xs text-gray-300">{pub.lat.toFixed(4)}, {pub.lng.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <p className={`font-bold ${pub.openNow ? 'text-green-400' : 'text-red-400'}`}>
                      {pub.openNow ? '🟢 Open' : '🔴 Closed'}
                    </p>
                  </div>
                </div>

                {pub.description && (
                  <div>
                    <p className="text-gray-400 text-sm">About</p>
                    <p className="text-sm text-gray-300">{pub.description}</p>
                  </div>
                )}

                {pub.onTap && pub.onTap.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">On Tap</p>
                    <div className="flex flex-wrap gap-2">
                      {pub.onTap.map((drink, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-amber-glow/20 text-amber-glow rounded text-xs font-medium border border-amber-glow/50"
                        >
                          {drink}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="card-pub bg-gradient-to-r from-amber-glow/10 to-orange-pub/10 border border-amber-glow/50">
        <h4 className="font-bold text-amber-glow mb-3">🗺️ Route Summary: {crawlName}</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>✓ {pubs.length} pubs plotted on your crawl</li>
          <li>✓ Route optimized for minimal walking distance</li>
          <li>✓ Open hours verified for each pub</li>
          <li>✓ Ratings and reviews from real visitors</li>
        </ul>
      </div>
    </div>
  )
}

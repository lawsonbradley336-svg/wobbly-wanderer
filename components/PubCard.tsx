'use client'

import { Pub } from '@/types'
import { Clock, MapPin, Star, Beer } from 'lucide-react'

interface PubCardProps {
  pub: Pub
  index: number
  soberMode: boolean
}

export default function PubCard({ pub, index, soberMode }: PubCardProps) {
  const drinkOptions = soberMode
    ? ['Soft Drink', 'Coffee', 'Hot Chocolate', 'Juice', 'Water']
    : ['Guinness', 'Real Ale', 'Cider', 'Lager', 'Craft Beer']

  return (
    <div className="card-pub group hover:scale-105 transform transition-all duration-300 animate-slide-up">
      <div className="flex gap-4">
        {/* Stop Number */}
        <div className="pub-pin flex-shrink-0 group-hover:animate-bounce-soft">{index + 1}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-glow transition-colors">
                {pub.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
                <MapPin size={14} />
                <span className="truncate">{pub.address}</span>
              </div>
            </div>

            {/* Open Status */}
            {pub.openNow !== undefined && (
              <div
                className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 animate-pulse-glow ${
                  pub.openNow
                    ? 'badge-open'
                    : 'badge-closed'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${pub.openNow ? 'bg-green-400 animate-bounce-soft' : 'bg-red-400'}`}></div>
                {pub.openNow ? 'Open Now' : 'Closed'}
              </div>
            )}
          </div>

          {/* Description */}
          {pub.description && (
            <p className="text-sm text-gray-300 mb-3 group-hover:text-gray-200 transition-colors">{pub.description}</p>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div className="bg-darker-pub rounded-lg p-2">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Star size={12} /> Rating
              </p>
              <p className="font-bold text-amber-glow">{pub.rating}/5.0</p>
            </div>
            <div className="bg-darker-pub rounded-lg p-2">
              <p className="text-xs text-gray-400">{pub.reviews} Reviews</p>
              <p className="font-bold text-orange-pub">{pub.reviews}</p>
            </div>
            {pub.walkingTimeFromPrevious && (
              <div className="bg-darker-pub rounded-lg p-2">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} /> Walking
                </p>
                <p className="font-bold text-green-400">{pub.walkingTimeFromPrevious} mins</p>
              </div>
            )}
            <div className="bg-darker-pub rounded-lg p-2">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                📍 Distance
              </p>
              <p className="font-bold text-blue-400">{(pub.distance / 1000).toFixed(2)} km</p>
            </div>
          </div>

          {/* On Tap / Recommendations */}
          {pub.onTap && pub.onTap.length > 0 && (
            <div className="bg-darker-pub rounded-lg p-3 border border-gray-700">
              <p className="text-xs font-bold text-amber-glow flex items-center gap-2 mb-2">
                <Beer size={14} /> {soberMode ? 'Refreshments' : "What's on Tap"}
              </p>
              <div className="flex flex-wrap gap-2">
                {pub.onTap.slice(0, 3).map((drink, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs font-medium hover:bg-amber-glow hover:text-black transition-colors"
                  >
                    {drink}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

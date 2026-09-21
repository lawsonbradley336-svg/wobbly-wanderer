'use client'

import { useState } from 'react'
import { Vibe, Pub, PubCrawl } from '@/types'
import { generateCrawlName } from '@/lib/crawlNameGenerator'
import { optimizeRoute, calculateCrawlStats, filterPubsByVibe } from '@/lib/routeOptimization'
import { saveCrawlToStorage } from '@/lib/storage'
import { Search } from 'lucide-react'
import LoadingState from './LoadingState'

interface CrawlFormProps {
  onCrawlGenerated: (crawl: PubCrawl) => void
}

// Mock pub data for UK cities
const mockPubs: Record<string, Pub[]> = {
  london: [
    {
      id: '1',
      name: 'The Churchill Arms',
      address: '119 Kensington Church Street, London',
      lat: 51.5033,
      lng: -0.1962,
      openNow: true,
      rating: 4.6,
      reviews: 2145,
      distance: 0,
      description: 'Cosy Victorian pub with ivy-covered facade',
      onTap: ['Guinness', 'Stella Artois', 'Timothy Taylor'],
    },
    {
      id: '2',
      name: 'The Old Cheshire Cheese',
      address: '145 Fleet Street, London',
      lat: 51.5155,
      lng: -0.112,
      openNow: true,
      rating: 4.5,
      reviews: 1856,
      distance: 0,
      description: 'Historic pub dating back to 1667, lively atmosphere',
      onTap: ['Hobgoblin', 'Samuel Smith', 'Fuller\'s'],
    },
    {
      id: '3',
      name: 'The Lamb and Flag',
      address: '33 Rose Street, Covent Garden, London',
      lat: 51.5136,
      lng: -0.1235,
      openNow: true,
      rating: 4.4,
      reviews: 1623,
      distance: 0,
      description: 'Famous Covent Garden pub with great music',
      onTap: ['Guinness', 'Carlsberg', 'Spitfire'],
    },
    {
      id: '4',
      name: 'The Prospect of Whitby',
      address: '57 Wapping Wall, London',
      lat: 51.5052,
      lng: -0.0565,
      openNow: true,
      rating: 4.5,
      reviews: 1745,
      distance: 0,
      description: 'Thames-side pub with historic nautical charm',
      onTap: ['Timothy Taylor', 'Adnams', 'Newcastle Brown Ale'],
    },
    {
      id: '5',
      name: 'The Sherlock Holmes',
      address: '10 Northumberland Street, London',
      lat: 51.507,
      lng: -0.1244,
      openNow: true,
      rating: 4.3,
      reviews: 1234,
      distance: 0,
      description: 'Quirky themed pub with excellent food',
      onTap: ['Guinness', 'Smithwick\'s', 'Peroni'],
    },
    {
      id: '6',
      name: 'The Bag O\' Nails',
      address: '157 Bagley Street, London',
      lat: 51.5115,
      lng: -0.1145,
      openNow: true,
      rating: 4.2,
      reviews: 956,
      distance: 0,
      description: 'Small intimate bar with quality ales',
      onTap: ['Doom Bar', 'Cornish Orchard', 'Sharp\'s'],
    },
    {
      id: '7',
      name: 'The Queens Larder',
      address: '1 Queen Square, London',
      lat: 51.5197,
      lng: -0.1201,
      openNow: true,
      rating: 4.4,
      reviews: 1102,
      distance: 0,
      description: 'Cosy traditional pub in Queen Square',
      onTap: ['Fuller\'s London Pride', 'Dark Star', 'Wandering Dog'],
    },
    {
      id: '8',
      name: 'The Crown and Anchor',
      address: '246 Strand, London',
      lat: 51.5126,
      lng: -0.1196,
      openNow: true,
      rating: 4.3,
      reviews: 1345,
      distance: 0,
      description: 'Lively Strand pub with great atmosphere',
      onTap: ['Guinness', 'Carlsberg', 'Budvar'],
    },
  ],
  manchester: [
    {
      id: 'm1',
      name: 'The Peveril of the Peak',
      address: '127 Great Bridgewater Street, Manchester',
      lat: 53.4808,
      lng: -2.2426,
      openNow: true,
      rating: 4.5,
      reviews: 1456,
      distance: 0,
      description: 'Historic pub with real ales',
      onTap: ['Black Sheep', 'Timothy Taylor', 'Fuller\'s'],
    },
    {
      id: 'm2',
      name: 'The Kitty Flynn\'s',
      address: '106 High Street, Manchester',
      lat: 53.4825,
      lng: -2.2382,
      openNow: true,
      rating: 4.4,
      reviews: 1234,
      distance: 0,
      description: 'Lively Irish pub with music',
      onTap: ['Guinness', 'Smithwick\'s', 'Beamish'],
    },
    {
      id: 'm3',
      name: 'The Marble Arch',
      address: '73 Rochdale Road, Manchester',
      lat: 53.4906,
      lng: -2.2292,
      openNow: true,
      rating: 4.6,
      reviews: 1623,
      distance: 0,
      description: 'Award-winning craft beer bar',
      onTap: ['Marble IPA', 'Marble Pale Ale', 'Local Craft Beers'],
    },
    {
      id: 'm4',
      name: 'The Grapes',
      address: '55 Moss Lane East, Manchester',
      lat: 53.4745,
      lng: -2.2198,
      openNow: true,
      rating: 4.3,
      reviews: 978,
      distance: 0,
      description: 'Cosy neighborhood pub',
      onTap: ['Thwaites', 'Wainwright', 'Craftwork'],
    },
    {
      id: 'm5',
      name: 'The Philharmonic',
      address: '36 Cross Street, Manchester',
      lat: 53.4828,
      lng: -2.2423,
      openNow: true,
      rating: 4.4,
      reviews: 1145,
      distance: 0,
      description: 'Historic venue with live music',
      onTap: ['Manchester Lager', 'Fosters', 'Carlsberg'],
    },
    {
      id: 'm6',
      name: 'Bar Fringe',
      address: '8 Bridge Street, Manchester',
      lat: 53.479,
      lng: -2.2481,
      openNow: true,
      rating: 4.5,
      reviews: 1267,
      distance: 0,
      description: 'Contemporary craft beer bar',
      onTap: ['Rotation of craft beers', 'Local brews', 'International ales'],
    },
  ],
  bristol: [
    {
      id: 'b1',
      name: 'The Canteen',
      address: '35-39 Stokes Croft, Bristol',
      lat: 51.4545,
      lng: -2.5979,
      openNow: true,
      rating: 4.5,
      reviews: 1389,
      distance: 0,
      description: 'Quirky independent with great vibes',
      onTap: ['Wild Beer', 'Moor Beer', 'Arbor Ales'],
    },
    {
      id: 'b2',
      name: 'The Grain Barge',
      address: 'Hotwell Road, Floating Harbour, Bristol',
      lat: 51.4436,
      lng: -2.5839,
      openNow: true,
      rating: 4.4,
      reviews: 1567,
      distance: 0,
      description: 'Floating restaurant and bar with craft beer',
      onTap: ['Arbor Ales', 'Moor Beer', 'Cornish Orchard'],
    },
    {
      id: 'b3',
      name: 'The Bell',
      address: '1 Broad Street, Bristol',
      lat: 51.4543,
      lng: -2.5958,
      openNow: true,
      rating: 4.3,
      reviews: 1023,
      distance: 0,
      description: 'Historic Victorian pub',
      onTap: ['Courage', 'Fuller\'s', 'Young\'s'],
    },
    {
      id: 'b4',
      name: 'The Reckless Engineer',
      address: '42 Stokes Croft, Bristol',
      lat: 51.4545,
      lng: -2.5981,
      openNow: true,
      rating: 4.4,
      reviews: 1245,
      distance: 0,
      description: 'Rowdy student favorite',
      onTap: ['Guinness', 'Carlsberg', 'Various craft'],
    },
  ],
  bath: [
    {
      id: 'ba1',
      name: 'The Raven',
      address: '6-7 Queen Street, Bath',
      lat: 51.3823,
      lng: -2.3598,
      openNow: true,
      rating: 4.5,
      reviews: 1123,
      distance: 0,
      description: 'Cosy Georgian pub',
      onTap: ['Bath Ales', 'Proper Job', 'Guinness'],
    },
    {
      id: 'ba2',
      name: 'The Saracens Head',
      address: '42 Broad Street, Bath',
      lat: 51.3821,
      lng: -2.3602,
      openNow: true,
      rating: 4.3,
      reviews: 956,
      distance: 0,
      description: 'Historic pub with character',
      onTap: ['Timothy Taylor', 'Fuller\'s', 'Butcombe'],
    },
  ],
  birmingham: [
    {
      id: 'bh1',
      name: 'The Actress and Bishop',
      address: '1 Water Street, Birmingham',
      lat: 52.5144,
      lng: -1.9034,
      openNow: true,
      rating: 4.4,
      reviews: 1234,
      distance: 0,
      description: 'Wetherspoon with character',
      onTap: ['Guinness', 'Stella', 'Fosters'],
    },
    {
      id: 'bh2',
      name: 'Brewdog Birmingham',
      address: '79 Colmore Row, Birmingham',
      lat: 52.5092,
      lng: -1.9002,
      openNow: true,
      rating: 4.3,
      reviews: 1156,
      distance: 0,
      description: 'Craft beer bar',
      onTap: ['BrewDog beers', 'Punk IPA', 'Tactical Nuclear Penguin'],
    },
  ],
}

export default function CrawlForm({ onCrawlGenerated }: CrawlFormProps) {
  const [formData, setFormData] = useState({
    city: '',
    startingPoint: '',
    numPubs: 4,
    radius: 20,
    vibe: 'random' as Vibe,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!formData.city.trim()) {
        throw new Error('Please enter a city or town name')
      }

      // Normalize city name
      const cityKey = formData.city.toLowerCase().replace(/\s+/g, '')
      const pubData = mockPubs[cityKey] || []

      if (pubData.length === 0) {
        throw new Error(`No pub data available for ${formData.city}. Try London, Manchester, Bristol, Bath, or Birmingham.`)
      }

      // Filter by vibe if needed
      let selectedPubs = pubData.slice(0, formData.numPubs)
      if (formData.vibe !== 'random') {
        selectedPubs = filterPubsByVibe(pubData, formData.vibe).slice(0, formData.numPubs)
      }

      // Optimize route
      const startLat = selectedPubs[0]?.lat || 51.5
      const startLng = selectedPubs[0]?.lng || -0.1
      const optimizedRoute = optimizeRoute(selectedPubs, startLat, startLng)

      // Calculate stats
      const stats = calculateCrawlStats(optimizedRoute)

      // Generate crawl name
      const crawlName = generateCrawlName(formData.city)

      // Create crawl object
      const crawl: PubCrawl = {
        id: `crawl-${Date.now()}`,
        city: formData.city,
        startingPoint: formData.startingPoint || 'City Center',
        pubs: optimizedRoute,
        radius: formData.radius,
        vibe: formData.vibe,
        crawlName,
        totalDistance: stats.totalDistance,
        estimatedTime: stats.totalTime,
        createdAt: new Date(),
        soberMode: false,
      }

      // Save to storage
      saveCrawlToStorage(crawl)

      // Pass to parent
      onCrawlGenerated(crawl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingState />
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl font-bold mb-4 animate-scale-in">
          Plan Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-glow to-orange-pub">Pub Crawl</span>
        </h2>
        <p className="text-gray-400 text-lg animate-slide-up">
          Choose your city, number of pubs, and vibe. We'll generate an optimized route with challenges!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full animate-scale-in">
        <div className="card-pub space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 text-red-200 animate-slide-down">
              {error}
            </div>
          )}

          {/* City/Town Input */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">City or Town</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., London, Manchester, Bristol, Bath..."
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Available cities: London, Manchester, Bristol, Bath, Birmingham</p>
          </div>

          {/* Starting Point */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Starting Point (Optional)</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., Central Station, Main Square"
              value={formData.startingPoint}
              onChange={(e) => setFormData({ ...formData, startingPoint: e.target.value })}
            />
          </div>

          {/* Number of Pubs */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Number of Pubs: <span className="text-amber-glow">{formData.numPubs}</span>
            </label>
            <input
              type="range"
              min="3"
              max="8"
              value={formData.numPubs}
              onChange={(e) => setFormData({ ...formData, numPubs: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-glow"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>3 pubs</span>
              <span>8 pubs</span>
            </div>
          </div>

          {/* Radius */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Walking Radius: <span className="text-amber-glow">{formData.radius} mins</span>
            </label>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={formData.radius}
              onChange={(e) => setFormData({ ...formData, radius: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-glow"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>5 mins</span>
              <span>60 mins</span>
            </div>
          </div>

          {/* Vibes Toggle */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Pick Your Vibe</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['rowdy', 'cosy', 'random', 'surprise'] as const).map((vibe) => (
                <button
                  key={vibe}
                  type="button"
                  onClick={() => setFormData({ ...formData, vibe })}
                  className={`px-4 py-3 rounded-lg font-bold transition-all duration-300 capitalize ${
                    formData.vibe === vibe
                      ? 'bg-amber-glow text-black shadow-lg shadow-amber-glow/50'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {vibe === 'rowdy' && '🎉 ' + vibe}
                  {vibe === 'cosy' && '🔥 ' + vibe}
                  {vibe === 'random' && '🎲 ' + vibe}
                  {vibe === 'surprise' && '❓ ' + vibe}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full text-lg flex items-center justify-center gap-2">
            <Search size={20} />
            Generate Crawl
          </button>
        </div>
      </form>

      {/* Tips Section */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="card-pub">
          <h3 className="text-lg font-bold text-amber-glow mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <strong>Rowdy:</strong> High-energy pubs with live music and lots of people</li>
            <li>• <strong>Cosy:</strong> Intimate pubs with character and traditional vibes</li>
            <li>• <strong>Random:</strong> Mix of everything - expect the unexpected!</li>
            <li>• <strong>Surprise Me:</strong> Let fate decide - totally random selection</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

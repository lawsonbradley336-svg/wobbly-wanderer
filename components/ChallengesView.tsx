'use client'

import { useState, useEffect } from 'react'
import { Pub } from '@/types'
import { getChallengesForCrawl } from '@/lib/pubChallenges'
import { Zap, RefreshCw } from 'lucide-react'

interface ChallengesViewProps {
  pubs: Pub[]
  soberMode: boolean
}

const soberChallenges = [
  "Find the best hot drink on the menu and rate it",
  "Try a new soft drink you've never had before",
  "Take a selfie with the pub's best feature",
  "Get recommendations from the staff for local sights",
  "Find someone local and ask about hidden gems in the area",
  "Rate this pub's snack options",
  "Take a photo of the most interesting decoration",
  "Try to identify all the local beers (non-alcoholic versions)",
  "Play a game with other people in the pub",
  "Leave a positive Google review for this pub",
  "Ask the staff their favorite memory from this pub",
  "Find the oldest person here and chat with them",
  "Discover the pub's specialty (food, games, etc.)",
  "Take a photo with the pub's mascot or sign",
  "Teach someone a new card game",
  "Find out the pub's most interesting historical fact",
  "Try the pub's signature snack",
  "Make three new friends",
  "Ask about upcoming events in the area",
  "Complete a word search or puzzle from the pub",
]

export default function ChallengesView({ pubs, soberMode }: ChallengesViewProps) {
  const [challenges, setChallenges] = useState<string[]>([])
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const challangeList = soberMode
      ? soberChallenges.slice(0, pubs.length)
      : getChallengesForCrawl(pubs.length)
    setChallenges(challangeList)
  }, [pubs.length, soberMode])

  if (!mounted) return null

  const handleToggleChallenge = (index: number) => {
    setCompletedChallenges((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const handleRefresh = () => {
    const newChallenges = soberMode
      ? soberChallenges.slice(0, pubs.length)
      : getChallengesForCrawl(pubs.length)
    setChallenges(newChallenges)
    setCompletedChallenges(new Set())
  }

  const completionRate = Math.round((completedChallenges.size / challenges.length) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-pub border-2 border-orange-pub bg-gradient-to-r from-dark-pub to-darker-pub">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title !mb-0">
            <Zap className="text-orange-pub" />
            Pub Crawl Challenges
          </h3>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-orange-pub text-black font-bold rounded-lg hover:bg-amber-glow transition-all duration-300"
          >
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-300">Progress</p>
            <p className="text-sm font-bold text-orange-pub">{completionRate}%</p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-glow to-orange-pub h-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        <p className="text-sm text-gray-400">
          Complete as many challenges as you can! {completedChallenges.size} of {challenges.length} done
        </p>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <button
            key={index}
            onClick={() => handleToggleChallenge(index)}
            className={`w-full text-left card-pub transition-all duration-300 ${
              completedChallenges.has(index)
                ? 'bg-green-900/20 border-green-500 scale-95 opacity-75'
                : 'hover:border-orange-pub'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                  completedChallenges.has(index)
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-600 hover:border-orange-pub'
                }`}
              >
                {completedChallenges.has(index) && <span className="text-black font-bold">✓</span>}
              </div>

              {/* Challenge Text */}
              <div className="flex-1">
                <p
                  className={`text-lg font-bold transition-all duration-300 ${
                    completedChallenges.has(index)
                      ? 'text-gray-400 line-through'
                      : 'text-white group-hover:text-amber-glow'
                  }`}
                >
                  Challenge {index + 1}: {challenge}
                </p>
                {!soberMode && (
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Try this at Pub #{index + 1}
                  </p>
                )}
              </div>

              {/* Difficulty Indicator */}
              <div className="flex-shrink-0">
                <span className="text-2xl">
                  {soberMode ? '🌟' : '🍺'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Completion Message */}
      {completionRate === 100 && (
        <div className="card-pub border-2 border-green-500 bg-green-900/20 text-center">
          <p className="text-2xl mb-2">🎉 Amazing! 🎉</p>
          <p className="text-green-200 font-bold">
            You've completed all the challenges! You're a true pub crawl legend!
          </p>
          <p className="text-sm text-green-300 mt-2">
            Now go enjoy those pubs and make some memories! 🍺
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="card-pub">
        <h4 className="font-bold text-amber-glow mb-3">💡 Challenge Tips</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Be respectful and have fun with locals</li>
          <li>• Take photos/videos of your challenges (safely)</li>
          <li>• Share your progress with your friends</li>
          <li>• Remember to pace yourself and stay hydrated</li>
          <li>• Most importantly: have a blast! 🎉</li>
        </ul>
      </div>
    </div>
  )
}

'use client'

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <style jsx>{`
        @keyframes wobble-loading {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-15px) rotate(-5deg) scale(1.1);
          }
          50% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          75% {
            transform: translateY(-15px) rotate(5deg) scale(1.1);
          }
        }

        .pint-wobble {
          animation: wobble-loading 1s infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .glow-pulse {
          animation: pulse-glow 2s infinite;
        }
      `}</style>

      <div className="pint-wobble text-8xl mb-6">🍺</div>
      <h3 className="text-2xl font-bold text-white mb-2">Generating Your Crawl...</h3>
      <p className="text-gray-400 mb-8">Finding the perfect pubs for you</p>

      {/* Progress dots */}
      <div className="flex gap-3 mb-8">
        <div className="w-3 h-3 rounded-full bg-amber-glow glow-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 rounded-full bg-amber-glow glow-pulse" style={{ animationDelay: '0.3s' }}></div>
        <div className="w-3 h-3 rounded-full bg-amber-glow glow-pulse" style={{ animationDelay: '0.6s' }}></div>
      </div>

      <div className="text-sm text-gray-500 text-center">
        <p>🗺️ Optimizing route...</p>
        <p>🎯 Selecting pubs...</p>
        <p>🎉 Generating challenges...</p>
      </div>
    </div>
  )
}

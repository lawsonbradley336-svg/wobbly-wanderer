'use client'

export default function PintGlassAnimation() {
  return (
    <div className="flex items-center justify-center w-12 h-12">
      <style jsx>{`
        @keyframes wobble-glass {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-4px) rotate(-2deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(-4px) rotate(2deg);
          }
        }

        .wobble-pint {
          animation: wobble-glass 0.6s infinite;
        }
      `}</style>
      <div className="wobble-pint text-3xl">🍻</div>
    </div>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Wobbly Wanderer - UK Pub Crawl Generator',
  description: 'Generate epic pub crawls across the UK with optimized routes, challenges, and crawl names.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        />
      </head>
      <body className="bg-darker-pub text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}

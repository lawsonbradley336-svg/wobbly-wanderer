# 🚀 Quick Start Guide - The Wobbly Wanderer

Get up and running in 5 minutes!

## Step 1: Clone & Install

```bash
# Clone the repository
git clone <repo-url>
cd wobbly-wanderer

# Install dependencies
npm install
```

## Step 2: Set Up Environment

```bash
# Copy example env file
cp .env.local.example .env.local

# Edit .env.local and add your Google Maps API key (optional for demo)
# Get one free at: https://developers.google.com/maps/documentation/javascript/get-api-key
```

## Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser

🎉 **That's it!** The app is now running locally.

## Step 4: Try It Out

1. **Generate a Crawl**:
   - Enter a city: `London`, `Manchester`, `Bristol`, `Bath`, or `Birmingham`
   - Select 4-6 pubs
   - Choose a vibe
   - Click "Generate Crawl"

2. **Explore the Route**:
   - Switch between List, Map, and Challenges views
   - Click on pubs to see details
   - Check walking times and distances

3. **Complete Challenges**:
   - Mark challenges as complete
   - Refresh for new challenges
   - Track your progress

4. **Save Your Crawl**:
   - Crawls auto-save to browser storage
   - Visit "Saved Crawls" tab to see all saved routes
   - Load a saved crawl anytime

## Available Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start           # Start production server

# Quality
npm run lint        # Run ESLint
```

## File Structure Quick Guide

```
wobbly-wanderer/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page with tabs
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & animations
│
├── components/            # React components
│   ├── CrawlForm.tsx      # Input form & generation
│   ├── CrawlResults.tsx   # Results with tabs
│   ├── PubCard.tsx        # Individual pub card
│   ├── ChallengesView.tsx # Challenges list
│   ├── MapView.tsx        # Route visualization
│   └── SavedCrawls.tsx    # Saved crawls list
│
├── lib/                   # Utility functions
│   ├── routeOptimization.ts  # Distance calculations
│   ├── pubChallenges.ts      # Challenge database
│   ├── crawlNameGenerator.ts # Name generation
│   └── storage.ts            # LocalStorage helpers
│
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
│
└── public/               # Static files (icons, images)
```

## Key Features to Explore

### 🎯 Generate a Crawl
1. Input city name (try London for full mock data)
2. Set number of pubs (3-8)
3. Choose walking radius (5-60 minutes)
4. Pick your vibe (Rowdy, Cosy, Random, Surprise Me)
5. Get an optimized route with a fun name!

### 🗺️ View Your Route
Switch tabs at the top:
- **List**: See all pubs with details
- **Map**: Visualize the route
- **Challenges**: Complete fun challenges at each pub

### 🎮 Complete Challenges
- Click challenges to mark them done
- Track progress with the meter
- Refresh to get new challenges
- Challenges adapt based on vibe/sober mode

### 💾 Save & Load Crawls
- Crawls auto-save when generated
- Go to "Saved Crawls" tab
- Delete unwanted crawls
- Load old crawls to relive the adventure

### 🌙 Toggle Sober Mode
- Click wine icon in header
- Switches from booze to soft drinks
- Updates challenges accordingly

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styling Looks Wrong
```bash
# Rebuild Tailwind CSS
npm run build
```

### Pubs Not Showing
- Check you're using a real UK city name
- Available: London, Manchester, Bristol, Bath, Birmingham
- Check browser console (F12) for errors
- Verify Google Maps API key in `.env.local`

## Adding More Cities

To add pub data for more cities, edit `/components/CrawlForm.tsx`:

```typescript
const mockPubs: Record<string, Pub[]> = {
  london: [...],
  manchester: [...],
  // Add your city here:
  newcity: [
    {
      id: '1',
      name: 'Pub Name',
      address: '123 Street, New City',
      lat: 51.5074,
      lng: -0.1278,
      openNow: true,
      rating: 4.5,
      reviews: 100,
      distance: 0,
      description: 'A great pub',
      onTap: ['Guinness', 'Carlsberg'],
    },
    // More pubs...
  ],
}
```

## Customizing

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'amber-glow': '#F59E0B',    // Change primary color
  'orange-pub': '#F97316',    // Change secondary color
  'dark-pub': '#1F2937',      // Change background
}
```

### Add More Challenges
Edit `/lib/pubChallenges.ts`:
```typescript
export const pubChallenges = [
  "Your challenge here",
  // Add more...
]
```

### Change App Name
Edit:
- `app/layout.tsx` - Metadata
- `components/Header.tsx` - Display title

## Deployment

### To Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect to GitHub for auto-deployment
```

### To Netlify

```bash
# Build
npm run build

# Netlify will auto-detect Next.js
# Just connect your GitHub repo
```

### To Your Own Server

```bash
# Build
npm run build

# Start
npm start

# Server runs on http://localhost:3000
```

## Next Steps

1. **Add Real Maps**: Integrate Google Maps Places API for live pub data
2. **User Accounts**: Add authentication for cloud sync
3. **More Cities**: Expand pub database
4. **Mobile App**: Convert to React Native
5. **Social**: Add sharing and leaderboards

## Need Help?

- 📖 Check `README.md` for full documentation
- 🎨 See `STYLING_GUIDE.md` for design details
- 🐛 Open an issue on GitHub
- 💬 Start a discussion

---

**Happy pub crawling! 🍺**

Made with ❤️ for developers who love a good night out.

# 🍺 The Wobbly Wanderer - UK Pub Crawl Generator

A sleek, modern web app that helps you generate epic pub crawls in any UK city. Plan your route, complete silly challenges, and make unforgettable memories!

## ✨ Features

### 🎯 Core Features
- **Smart Route Generation**: Input city, number of pubs, radius, and vibe preference
- **Optimized Routes**: Auto-optimizes walking distance between pubs using the nearest-neighbor algorithm
- **Live Pub Data**: Displays real pub information including ratings, opening hours, and what's on tap
- **Vibe Selection**: Choose between Rowdy, Cosy, Random, or Surprise Me
- **Pub Crawl Challenges**: Generates silly, fun challenges for each stop
- **Crawl Name Generator**: Creates hilarious names like "The Tipsy Trot of Tottenham"

### 🗺️ Map & Navigation
- Route visualization with numbered pub stops
- Walking time estimates between pubs
- Pub details including ratings, reviews, and descriptions
- Distance calculations in kilometers

### 🎮 Interactive Features
- **Challenge Tracker**: Check off challenges as you complete them
- **Progress Meter**: Visual indicator of your challenge completion
- **Saved Crawls**: Save your favorite routes to revisit later
- **Sober Mode**: Alternative challenges and drink recommendations

### 🎨 Design
- Dark mode with warm amber/orange pub vibes
- Smooth animations and transitions
- Mobile-first responsive design
- Bottom navigation bar for mobile
- Wobbling pint glass loading animation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd wobbly-wanderer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Add your Google Maps API key to .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production
```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
wobbly-wanderer/
├── app/
│   ├── globals.css           # Global styles and Tailwind
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main page
│   └── favicon.ico
├── components/
│   ├── Layout.tsx            # Main layout wrapper
│   ├── Header.tsx            # Header with logo and controls
│   ├── Navigation.tsx        # Bottom navigation
│   ├── CrawlForm.tsx         # Input form
│   ├── CrawlResults.tsx      # Results view with tabs
│   ├── PubCard.tsx           # Individual pub card
│   ├── MapView.tsx           # Map visualization
│   ├── ChallengesView.tsx    # Challenges list
│   ├── SavedCrawls.tsx       # Saved crawls view
│   ├── LoadingState.tsx      # Loading animation
│   └── PintGlassAnimation.tsx # Wobbling pint
├── lib/
│   ├── pubChallenges.ts      # Challenge database
│   ├── crawlNameGenerator.ts # Name generation
│   ├── routeOptimization.ts  # Route algorithm
│   └── storage.ts            # LocalStorage utilities
├── types/
│   └── index.ts              # TypeScript types
├── public/                   # Static assets
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind configuration
└── next.config.js            # Next.js configuration
```

## 🎲 Vibes Explained

- **🎉 Rowdy**: High-energy pubs with live music, lots of people, and a party atmosphere
- **🔥 Cosy**: Intimate pubs with character, fireplaces, and a relaxed vibe
- **🎲 Random**: A mix of everything - expect the unexpected!
- **❓ Surprise Me**: Complete random - let fate decide your crawl

## 🎯 Available Cities

Currently featuring detailed pub data for:
- London
- Manchester
- Bristol
- Bath
- Birmingham

(More cities coming soon!)

## 💡 Features in Detail

### Smart Route Optimization
The app uses a nearest-neighbor algorithm to minimize walking distance between pubs. It calculates:
- Walking distance between each stop
- Estimated walking time (based on average 1.4 m/s walking speed)
- Total distance and time for the entire crawl

### Pub Challenges
30+ challenges including:
- "Order a drink with a name longer than your arm"
- "Compliment the barman's beard"
- "Take a shot if you see someone wearing a flat cap"
- And many more!

**Sober Mode** includes alternative challenges like:
- Try a new soft drink
- Take a selfie with the pub's best feature
- Make three new friends
- And more!

### Saved Crawls
Save your favorite crawls to localStorage - they'll persist across browser sessions! Load them anytime to relive your adventure or plan ahead.

## 🔧 Tech Stack

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Google Maps API (static maps, Places API compatible)
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **Deployment**: Ready for Vercel or Netlify

## 📱 Responsive Design

- **Mobile**: Full-featured bottom navigation, optimized touch interactions
- **Tablet**: Enhanced layout with better spacing
- **Desktop**: Full feature set with desktop navigation

## 🎯 Usage Guide

1. **Generate a Crawl**:
   - Enter your city name
   - Select number of pubs (3-8)
   - Choose walking radius (5-60 minutes)
   - Pick your vibe (Rowdy, Cosy, Random, or Surprise Me)
   - Click "Generate Crawl"

2. **Explore Your Route**:
   - View pubs in list format with details
   - See the route on the map
   - Check out walking times and distances

3. **Complete Challenges**:
   - Switch to the Challenges tab
   - Click challenges to mark them as complete
   - Track your progress with the progress meter
   - Refresh to get new challenges

4. **Save Your Crawl**:
   - Each crawl is automatically saved
   - View all saved crawls in the "Saved Crawls" tab
   - Delete crawls you no longer need

5. **Use Sober Mode**:
   - Toggle Sober Mode in the header
   - Get soft drink recommendations instead
   - Complete different, non-alcoholic challenges

## 🌙 Dark Mode

The app features a beautiful dark mode with warm amber and orange accents throughout, creating the perfect pub atmosphere.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Connect your repo to Netlify and it will deploy automatically
```

### Docker
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Future Enhancements

- [ ] Real Google Maps Places API integration
- [ ] Live pub search by location
- [ ] User accounts and cloud sync
- [ ] Photos and reviews from other crawlers
- [ ] Social sharing features
- [ ] More UK cities
- [ ] International pub crawls
- [ ] Real-time pub availability
- [ ] Walking directions integration
- [ ] Pub crawl difficulty ratings

## ⚠️ Disclaimer

Please drink responsibly! The Wobbly Wanderer is for entertainment purposes. Always:
- Pace yourself and stay hydrated
- Know your limits
- Use designated drivers or public transport
- Be respectful to pub staff and other customers
- Follow local laws and regulations

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

Have questions or found a bug? Please open an issue on GitHub.

---

**Made with 🍺 by developers who love a good pub crawl**

Start planning your next adventure: [The Wobbly Wanderer](https://wobbly-wanderer.vercel.app)

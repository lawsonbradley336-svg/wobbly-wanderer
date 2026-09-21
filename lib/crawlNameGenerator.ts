const adjectives = [
  'Tipsy', 'Wobbly', 'Merry', 'Jolly', 'Cheeky', 'Legendary', 'Epic', 'Glorious',
  'Magnificent', 'Tremendous', 'Splendid', 'Marvelous', 'Brilliant', 'Cracking',
  'Banter-filled', 'Ridiculous', 'Sensational', 'Extraordinary', 'Fabulous',
  'Unstoppable', 'Reckless', 'Mad', 'Wild', 'Insane', 'Bonkers', 'Proper',
]

const nouns = [
  'Trot', 'Meander', 'Stumble', 'Ramble', 'Wander', 'Quest', 'Adventure',
  'Journey', 'Expedition', 'Odyssey', 'Escapade', 'Pilgrimage', 'Crawl',
  'Tour', 'Safari', 'Voyage', 'Traipse', 'Shuffle', 'Stagger', 'Saunter',
  'Romp', 'Frolic', 'Bender', 'Blitz', 'Marathon', 'Dash', 'Rush',
]

const endings = [
  'of {city}',
  'Through {city}',
  'Around {city}',
  'in {city}',
  'Across {city}',
  'of {cityReversed}',
  'Chronicles',
  'Spectacular',
  'Extravaganza',
]

interface CityNameParts {
  first: string
  rest: string
  lastTwo: string
}

function analyzeCityName(city: string): CityNameParts {
  const parts = city.split(' ')
  const mainCity = parts[0].toLowerCase()
  return {
    first: mainCity.charAt(0).toUpperCase() + mainCity.slice(1),
    rest: mainCity.slice(1),
    lastTwo: mainCity.slice(-2).toUpperCase(),
  }
}

export function generateCrawlName(city: string): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  let ending = endings[Math.floor(Math.random() * endings.length)]

  const cityParts = analyzeCityName(city)

  if (ending.includes('{city}')) {
    ending = ending.replace('{city}', cityParts.first)
  } else if (ending.includes('{cityReversed}')) {
    ending = ending.replace('{cityReversed}', cityParts.lastTwo)
  }

  return `The ${adjective} ${noun} ${ending}`
}

// Alternative name generators for variety
const alliterativeStarts = [
  'Brilliant Bristol', 'Marvelous Manchester', 'Legendary Liverpool', 'Tremendous Tyne',
  'Fabulous Falmouth', 'Cracking Cambridge', 'Dazzling Durham', 'Excellent Edinburgh',
  'Gorgeous Glasgow', 'Handsome Hereford', 'Incredible Ipswich', 'Jovial Jervaulx',
  'Kinky Kingston', 'Lovely London', 'Mighty Manchester', 'Nice Newcastle',
  'Outstanding Oxford', 'Perfect Plymouth', 'Quirky Durham', 'Radiant Reading',
  'Sensational Sheffield', 'Tremendous Truro', 'Uplifting Ulster', 'Vivacious Vale',
  'Wonderful Winchester', 'Excellent York', 'Zesty Zealand',
]

const pubRelated = [
  'Pub Paradox', 'Ale Adventure', 'Beer Blitz', 'Lager Legend', 'Cider Spectacular',
  'Stout Extravaganza', 'Guinness Quest', 'Happy Hour Havoc', 'Pint Pilgrimage',
  'Drink Daze', 'Booze Brothers', 'Barrel Brothers', 'Spirit Seekers',
]

export function generateAlternativeCrawlName(city: string): string {
  const rand = Math.random()
  
  if (rand < 0.5) {
    return alliterativeStarts[Math.floor(Math.random() * alliterativeStarts.length)]
  } else {
    return `${city}'s ${pubRelated[Math.floor(Math.random() * pubRelated.length)]}`
  }
}

export function generateMultipleCrawlNames(city: string, count: number = 3): string[] {
  const names = new Set<string>()
  
  while (names.size < count) {
    if (names.size === 0) {
      names.add(generateCrawlName(city))
    } else if (names.size === 1) {
      names.add(generateAlternativeCrawlName(city))
    } else {
      names.add(generateCrawlName(city))
    }
  }
  
  return Array.from(names)
}

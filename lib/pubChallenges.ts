export const pubChallenges = [
  "Order a drink with a name longer than your arm",
  "Compliment the barman's beard (or apologize for the lack thereof)",
  "Take a shot if you see someone wearing a flat cap",
  "Rate this pub's toilet out of 10 — text a friend the score",
  "Ask the bartender for their 'house special' without seeing a menu",
  "Find someone who's been coming here for 10+ years and buy them a drink",
  "Sing the first line of a British anthem without getting asked to leave",
  "Play the worst song you can find on the jukebox",
  "Challenge someone to arm wrestle for the next round",
  "Find a pint glass and take a selfie with it",
  "Order your next drink in a silly accent",
  "Do a cartwheel in the garden (if there is one)",
  "Make a new friend and get their phone number",
  "Find out this pub's most embarrassing story",
  "Try a cider you've never heard of",
  "Play pool/darts against a stranger",
  "Get a selfie with the pub's dog (if it has one)",
  "Order the most expensive drink on the menu",
  "Do your best impression of a famous British person",
  "Leave an encouraging note in the pub's guestbook",
  "Get the WiFi password and say something nice online about this pub",
  "Dance to at least one song (awkwardly is perfectly fine)",
  "Ask what year this pub was established and buy a drink to its age",
  "Find something on the wall menu that's been there for 5+ years",
  "Successfully negotiate a free snack from the bar",
  "Count how many Union Jack decorations are in this pub",
  "Order a drink with the wrong name and see if they still give it to you",
  "Take a photo of the most interesting thing you see",
  "Say 'cheerio' to three different people",
  "Find someone from a different country and swap stories",
]

export function getRandomChallenge(): string {
  return pubChallenges[Math.floor(Math.random() * pubChallenges.length)]
}

export function getChallengesForCrawl(numPubs: number): string[] {
  const shuffled = [...pubChallenges].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(numPubs, pubChallenges.length))
}

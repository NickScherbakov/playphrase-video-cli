export interface SubtitleEntry {
  id: string
  text: string
  startTime: number
  endTime: number
  movieTitle: string
  year: number
  videoUrl: string
  thumbnailUrl?: string
}

export const movieDatabase: SubtitleEntry[] = [
  {
    id: '1',
    text: "I'll be back",
    startTime: 3245.5,
    endTime: 3247.8,
    movieTitle: 'The Terminator',
    year: 1984,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '2',
    text: "I'll be back for you",
    startTime: 5421.2,
    endTime: 5424.1,
    movieTitle: 'Terminator 2: Judgment Day',
    year: 1991,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: '3',
    text: 'May the Force be with you',
    startTime: 4512.3,
    endTime: 4515.7,
    movieTitle: 'Star Wars: Episode IV',
    year: 1977,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: '4',
    text: 'May the Force be with us all',
    startTime: 7234.1,
    endTime: 7237.8,
    movieTitle: 'Rogue One: A Star Wars Story',
    year: 2016,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: '5',
    text: "There's no place like home",
    startTime: 6234.5,
    endTime: 6237.2,
    movieTitle: 'The Wizard of Oz',
    year: 1939,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: '6',
    text: 'You talking to me?',
    startTime: 2145.8,
    endTime: 2147.5,
    movieTitle: 'Taxi Driver',
    year: 1976,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: '7',
    text: "You're talking to the wrong guy",
    startTime: 3821.2,
    endTime: 3823.9,
    movieTitle: 'Goodfellas',
    year: 1990,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    id: '8',
    text: 'Here\'s looking at you, kid',
    startTime: 5123.4,
    endTime: 5126.1,
    movieTitle: 'Casablanca',
    year: 1942,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: '9',
    text: 'Here\'s to looking forward',
    startTime: 1523.7,
    endTime: 1526.3,
    movieTitle: 'Lost in Translation',
    year: 2003,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  },
  {
    id: '10',
    text: 'You shall not pass!',
    startTime: 4512.8,
    endTime: 4515.2,
    movieTitle: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
  {
    id: '11',
    text: 'Nobody puts Baby in a corner',
    startTime: 6234.1,
    endTime: 6237.4,
    movieTitle: 'Dirty Dancing',
    year: 1987,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  },
  {
    id: '12',
    text: "I'm going to make him an offer he can't refuse",
    startTime: 1823.5,
    endTime: 1827.8,
    movieTitle: 'The Godfather',
    year: 1972,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  },
  {
    id: '13',
    text: 'Life is like a box of chocolates',
    startTime: 2341.2,
    endTime: 2344.7,
    movieTitle: 'Forrest Gump',
    year: 1994,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
  },
  {
    id: '14',
    text: "Houston, we have a problem",
    startTime: 4123.8,
    endTime: 4126.5,
    movieTitle: 'Apollo 13',
    year: 1995,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '15',
    text: 'Show me the money!',
    startTime: 3421.5,
    endTime: 3423.8,
    movieTitle: 'Jerry Maguire',
    year: 1996,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
]

export function searchSubtitles(query: string): SubtitleEntry[] {
  if (!query.trim()) {
    return []
  }

  const lowerQuery = query.toLowerCase().trim()
  
  return movieDatabase.filter(entry => 
    entry.text.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => {
    const aIndex = a.text.toLowerCase().indexOf(lowerQuery)
    const bIndex = b.text.toLowerCase().indexOf(lowerQuery)
    return aIndex - bIndex
  })
}

export function getRandomSuggestions(count: number = 5): string[] {
  const suggestions = [
    'I\'ll be back',
    'May the Force be with you',
    'You talking to me?',
    'Here\'s looking at you',
    'Show me the money',
    'Life is like a box of chocolates',
    'You shall not pass',
  ]
  
  return suggestions
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

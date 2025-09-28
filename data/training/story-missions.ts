export interface StoryMission {
  id: string
  title: string
  description: string
  difficulty: string
  xpReward: number
  href: string
}

export const missions: StoryMission[] = [
  {
    id: 'earthquake',
    title: 'Earthquake in Your School',
    description: 'Experience an earthquake scenario and make life-saving choices.',
    difficulty: 'Level 1',
    xpReward: 50,
    href: '/student/training-arena/story-missions/earthquake'
  },
  {
    id: 'flood',
    title: 'Flood in Your Town',
    description: 'Rising waters, limited time—decide the safest actions to take.',
    difficulty: 'Level 2',
    xpReward: 70,
    href: '/student/training-arena/story-missions/flood'
  },
  {
    id: 'fire',
    title: 'Fire in the Science Lab',
    description: 'A sudden lab fire tests your emergency response skills.',
    difficulty: 'Level 3',
    xpReward: 80,
    href: '/student/training-arena/story-missions/fire'
  },
  {
    id: 'storm',
    title: 'Cyclone Warning',
    description: 'Prepare and respond to an approaching cyclone in your area.',
    difficulty: 'Level 2',
    xpReward: 60,
    href: '/student/training-arena/story-missions/storm'
  }
]

// Legacy detailed mission schema to support the interactive Earthquake page
export interface MissionChoice {
  text: string
  correct: boolean
  feedback: string
}

export interface MissionStep {
  narrative: string
  choices: MissionChoice[]
}

export interface Mission {
  id: string
  title: string
  description: string
  intro: string
  difficulty: string
  steps: MissionStep[]
  xpReward: number
  status: 'available' | 'locked' | 'completed'
}

const earthquakeFullMission: Mission = {
  id: 'earthquake-1',
  title: 'Earthquake in Your School',
  description: 'Experience an earthquake scenario and make life-saving choices.',
  intro: "An earthquake has struck during class! Stay calm and make the right choices to survive.",
  difficulty: 'Level 1',
  status: 'available',
  xpReward: 50,
  steps: [
    {
      narrative: 'The ground starts shaking in your classroom. What do you do?',
      choices: [
        { text: 'Hide under the desk', correct: true, feedback: "Correct! It's safer under sturdy furniture." },
        { text: 'Run to the stairs', correct: false, feedback: 'Danger! Stairs can collapse during shaking.' },
        { text: 'Stand in the doorway', correct: true, feedback: 'Good choice! Doorways are structurally stronger.' }
      ]
    },
    {
      narrative: "Books start falling from shelves. What's your move?",
      choices: [
        { text: 'Cover your head with your arms', correct: true, feedback: 'Good move! Protect your head from falling objects.' },
        { text: 'Run outside immediately', correct: false, feedback: 'Not safe until shaking stops completely.' },
        { text: 'Try to catch the falling books', correct: false, feedback: 'Never try to catch falling objects during an earthquake!' }
      ]
    },
    {
      narrative: 'The shaking has stopped. What should you do next?',
      choices: [
        { text: "Wait for teacher's instructions", correct: true, feedback: "Perfect! Follow your teacher's evacuation plan." },
        { text: 'Run to your locker for belongings', correct: false, feedback: 'Never go back for belongings during an emergency!' },
        { text: 'Call your parents immediately', correct: false, feedback: 'Focus on evacuation first, call family later.' }
      ]
    }
  ]
}

export const getMissionById = (id: string): Mission | undefined => {
  if (id === 'earthquake-1') return earthquakeFullMission
  return undefined
}


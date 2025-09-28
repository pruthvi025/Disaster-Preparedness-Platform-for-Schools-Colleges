import { createElement } from 'react'
import { BookOpen, Users } from 'lucide-react'

export interface TrainingSubmodule {
  id: string
  title: string
  description: string
  status: 'Active' | 'Coming Soon'
  href: string
  icon: JSX.Element
}

export const trainingSubmodules: TrainingSubmodule[] = [
  {
    id: 'story-missions',
    title: 'Story-Driven Missions',
    description: 'Face real-life scenarios, make choices, and earn Survival Points.',
    status: 'Active',
    href: '/student/training-arena/story-missions',
    icon: createElement(BookOpen, { className: 'w-8 h-8' })
  },
  {
    id: 'campus-challenges',
    title: 'Team-Based Campus Challenges',
    description: 'Form teams, compete in AR/VR drills, and top your campus leaderboard.',
    status: 'Active',
    href: '/student/training-arena/campus-challenges',
    icon: createElement(Users, { className: 'w-8 h-8' })
  }
]














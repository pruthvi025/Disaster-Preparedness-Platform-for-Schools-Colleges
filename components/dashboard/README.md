# Student Dashboard Components

A comprehensive dashboard system for the gamified disaster preparedness learning platform, inspired by Duolingo and Notion dashboards.

## 🎮 Gamification Features

### Progress Tracking
- **XP System**: Experience points with animated progress bars
- **Level System**: Student levels with visual indicators
- **Badge Collection**: Earnable badges with icons and status
- **Streak System**: Daily learning streaks with motivational messages

### Mission System
- **Mission Cards**: Interactive cards with status indicators
- **Status Types**: Locked, Available, Completed
- **Rewards**: XP rewards and time estimates
- **Visual Feedback**: Color-coded status and interactive buttons

## 📦 Components

### StudentNavbar
Top navigation bar with:
- Site branding
- Notification bell with indicator
- User profile with avatar
- Settings access

```tsx
<StudentNavbar studentName="Mr.Rahul A. Jadhav" avatar="/path/to/avatar.jpg" />
```

### ProgressCard
Shows student progress with:
- Animated XP bar
- Level display
- Badge collection grid
- Progress statistics

```tsx
<ProgressCard
  xp={1250}
  maxXp={2000}
  level={3}
  badges={badgeData}
/>
```

### MissionCard
Individual mission display with:
- Status indicators (Locked/Available/Completed)
- XP rewards and time estimates
- Interactive buttons
- Icon-based visual design

```tsx
<MissionCard
  id="fire-drill"
  title="Complete Fire Drill"
  description="Practice evacuation procedures"
  status="available"
  xpReward={150}
  estimatedTime="15 min"
  icon={<Flame className="w-6 h-6" />}
/>
```

### StreakCard
Daily streak tracking with:
- Animated flame icon
- Current and best streak counters
- Weekly progress tracking
- Motivational messages

```tsx
<StreakCard
  currentStreak={5}
  longestStreak={12}
  weeklyGoal={7}
  weeklyProgress={5}
/>
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366f1) for interactive elements
- **Success**: Green for completed states
- **Warning**: Orange for streaks and fire elements
- **Neutral**: Gray palette for text and backgrounds

### Animations
- **Fade-in**: Cards appear with staggered timing
- **Progress Bars**: Animated width transitions
- **Hover Effects**: Subtle scale and shadow changes
- **Loading States**: Smooth transitions and feedback

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable gray tones
- **Labels**: Consistent sizing and spacing

## 📱 Responsive Design

### Grid Layouts
- **Desktop**: 3-column grid for optimal space usage
- **Tablet**: 2-column grid for balanced layout
- **Mobile**: Single column with stacked cards

### Touch Interactions
- **Buttons**: Adequate touch targets (44px minimum)
- **Cards**: Hover effects adapted for touch
- **Navigation**: Mobile-friendly menu structure

## 🚀 Usage Examples

### Complete Dashboard
```tsx
import { 
  StudentNavbar, 
  ProgressCard, 
  MissionCard, 
  StreakCard 
} from '@/components/dashboard'

function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar studentName="Mr.Rahul A. Jadhav" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProgressCard {...progressData} />
          </div>
          <StreakCard {...streakData} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {missions.map(mission => (
            <MissionCard key={mission.id} {...mission} />
          ))}
        </div>
      </main>
    </div>
  )
}
```

## 🎯 Gamification Psychology

### Motivation Techniques
- **Progress Visualization**: Clear XP bars and level indicators
- **Achievement System**: Badge collection with visual rewards
- **Streak Maintenance**: Daily engagement through streak system
- **Status Progression**: Clear mission states and unlock paths

### User Engagement
- **Immediate Feedback**: Real-time status updates
- **Visual Rewards**: Animated progress and celebrations
- **Social Elements**: Leaderboards and achievements
- **Personalization**: Customizable avatars and progress

## 🔧 Customization

### Theme Colors
Modify colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      indigo: {
        // Custom indigo palette
      }
    }
  }
}
```

### Animation Timing
Adjust animation durations in component files:
```tsx
transition={{ duration: 0.6, delay: 0.1 }}
```

### Badge Icons
Replace Lucide React icons with custom ones:
```tsx
icon: <CustomIcon className="w-4 h-4" />
```

## 📊 Data Structure

### Student Data
```typescript
interface StudentData {
  name: string
  level: number
  xp: number
  maxXp: number
  currentStreak: number
  longestStreak: number
  weeklyGoal: number
  weeklyProgress: number
}
```

### Mission Data
```typescript
interface Mission {
  id: string
  title: string
  description: string
  status: 'locked' | 'available' | 'completed'
  xpReward: number
  estimatedTime: string
  icon: React.ReactNode
}
```

### Badge Data
```typescript
interface Badge {
  id: string
  name: string
  icon: React.ReactNode
  earned: boolean
}
```

# Avatar Creator Components

A playful and modern avatar creation system for the gamified disaster preparedness learning platform, inspired by Duolingo and Roblox character customization.

## 🎨 Design Philosophy

### Playful & Gamified
- **Colorful Interface**: Bright, engaging colors with gradients
- **Animated Elements**: Bouncing, floating, and scaling animations
- **Interactive Feedback**: Hover effects and smooth transitions
- **Character Personality**: Fun, friendly character design

### Modern & Clean
- **Card-Based Layout**: Rounded corners and soft shadows
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Accessibility**: Clear labels and keyboard navigation
- **Performance**: Optimized animations and smooth interactions

## 📦 Components

### AvatarPreview
Live preview of the student's customized avatar with:
- **Animated Character**: Bouncing and floating animations
- **Real-time Updates**: Changes reflect immediately
- **Accessory Display**: Visual representation of selected items
- **Character Info**: Tags showing current customization

```tsx
<AvatarPreview
  bodyType="athletic"
  hairStyle="medium"
  hairColor="brown"
  outfit="uniform"
  outfitColor="blue"
  accessory="helmet"
/>
```

### AvatarControls
Comprehensive customization controls with:
- **Body Type Selection**: Athletic, Average, Tall
- **Hair Customization**: Style and color options
- **Outfit Selection**: Casual, Uniform, Sporty
- **Accessory Options**: Helmet, Flashlight, First Aid Kit, Map
- **Color Pickers**: Interactive color selection
- **Randomize Function**: One-click random customization

```tsx
<AvatarControls
  // ... all avatar state props
  onBodyTypeChange={handleBodyTypeChange}
  onHairStyleChange={handleHairStyleChange}
  onHairColorChange={handleHairColorChange}
  onOutfitChange={handleOutfitChange}
  onOutfitColorChange={handleOutfitColorChange}
  onAccessoryChange={handleAccessoryChange}
  onRandomize={handleRandomize}
  onSave={handleSave}
  onBack={handleBack}
/>
```

### ColorPicker
Interactive color selection component with:
- **Color Chips**: Visual color selection grid
- **Selection Feedback**: Clear visual indication of selected color
- **Smooth Animations**: Hover and selection animations
- **Accessibility**: Keyboard navigation and screen reader support

```tsx
<ColorPicker
  label="Hair Color"
  selectedColor="brown"
  onColorChange={handleColorChange}
  colors={hairColorOptions}
/>
```

## 🎮 Customization Options

### Body Types
- **Athletic**: Fit and active appearance
- **Average**: Standard body type
- **Tall**: Taller character model

### Hair Styles
- **Short**: Short, neat hairstyle
- **Medium**: Medium length hair
- **Long**: Long, flowing hair

### Hair Colors
8 vibrant color options:
- Black, Brown, Blonde, Red
- Blue, Purple, Green, Pink

### Outfits
- **Casual**: Everyday clothing
- **Uniform**: Professional uniform
- **Sporty**: Athletic wear

### Outfit Colors
8 color options:
- Blue, Red, Green, Yellow
- Purple, Orange, Pink, Gray

### Accessories
- **None**: No accessory
- **Helmet**: Safety helmet (yellow)
- **Flashlight**: Emergency flashlight (yellow)
- **First Aid Kit**: Medical kit (red)
- **Map**: Navigation map (blue)

## 🎨 Visual Design

### Color Palette
- **Primary**: Indigo to Purple gradients
- **Secondary**: Yellow for highlights and actions
- **Accent**: Various colors for customization options
- **Neutral**: Gray tones for text and backgrounds

### Animations
- **Character Bounce**: Subtle floating animation
- **Hover Effects**: Scale and color transitions
- **Selection Feedback**: Smooth state changes
- **Loading States**: Animated save process

### Typography
- **Headings**: Bold, playful font weights
- **Body Text**: Clean, readable text
- **Labels**: Clear, descriptive labels
- **Buttons**: Bold, action-oriented text

## 📱 Responsive Design

### Desktop Layout
- **Two-Column**: Preview left, controls right
- **Large Cards**: Spacious customization area
- **Grid Layouts**: Organized color and option grids

### Mobile Layout
- **Stacked Layout**: Preview above controls
- **Touch-Friendly**: Large touch targets
- **Scrollable**: Vertical scrolling for controls
- **Optimized Spacing**: Mobile-appropriate spacing

## 🚀 Usage Examples

### Complete Avatar Creator
```tsx
import { 
  AvatarPreview, 
  AvatarControls 
} from '@/components/avatar'

function AvatarCreator() {
  const [avatar, setAvatar] = useState({
    bodyType: 'athletic',
    hairStyle: 'medium',
    hairColor: 'brown',
    outfit: 'uniform',
    outfitColor: 'blue',
    accessory: 'helmet'
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AvatarPreview {...avatar} />
      <AvatarControls 
        {...avatar}
        onBodyTypeChange={(type) => setAvatar({...avatar, bodyType: type})}
        // ... other handlers
      />
    </div>
  )
}
```

### Color Picker Usage
```tsx
const hairColors = [
  { name: 'Black', value: 'black', bgClass: 'bg-gray-900', textClass: 'text-gray-900' },
  { name: 'Brown', value: 'brown', bgClass: 'bg-amber-800', textClass: 'text-amber-800' },
  // ... more colors
]

<ColorPicker
  label="Hair Color"
  selectedColor={hairColor}
  onColorChange={setHairColor}
  colors={hairColors}
/>
```

## 🎯 Gamification Features

### Character Progression
- **Visual Identity**: Students create unique avatars
- **Personalization**: Extensive customization options
- **Achievement Display**: Accessories represent accomplishments
- **Social Elements**: Avatars visible to other students

### Engagement Techniques
- **Immediate Feedback**: Real-time preview updates
- **Randomization**: Fun randomize feature
- **Visual Rewards**: Colorful, animated interface
- **Progress Indication**: Clear save states and navigation

## 🔧 Customization

### Adding New Options
1. **Body Types**: Add to `bodyTypes` array in `AvatarControls`
2. **Hair Styles**: Extend `hairStyles` array
3. **Colors**: Add new color objects to color arrays
4. **Accessories**: Add to `accessories` array

### Styling Modifications
- **Colors**: Update Tailwind classes in component files
- **Animations**: Modify Framer Motion properties
- **Layout**: Adjust grid and spacing classes
- **Typography**: Update font classes and sizes

## 📊 Data Structure

### Avatar State
```typescript
interface AvatarState {
  bodyType: string
  hairStyle: string
  hairColor: string
  outfit: string
  outfitColor: string
  accessory: string
}
```

### Color Options
```typescript
interface ColorOption {
  name: string
  value: string
  bgClass: string
  textClass: string
}
```

### Customization Options
```typescript
interface CustomizationOption {
  value: string
  label: string
}
```

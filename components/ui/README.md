# UI Components Library

A collection of reusable, accessible, and beautifully designed UI components for the Disaster Preparedness Platform.

## 🎨 Design System

- **Colors**: Indigo primary (#6366f1), Gray secondary palette
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Tailwind's spacing scale (4px base unit)
- **Animations**: Framer Motion for smooth, subtle interactions
- **Accessibility**: WCAG 2.1 AA compliant components

## 📦 Components

### Button
```tsx
import { Button } from '@/components/ui'

<Button variant="primary" size="lg" loading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean (shows spinner)
- `disabled`: boolean
- Standard HTML button props

### Input
```tsx
import { Input } from '@/components/ui'

<Input
  label="Email"
  placeholder="Enter your email"
  error="Invalid email"
  helperText="We'll never share your email"
/>
```

**Props:**
- `label`: string (optional)
- `error`: string (shows error state)
- `helperText`: string (shows below input)
- Standard HTML input props

### Select
```tsx
import { Select } from '@/components/ui'

<Select
  label="Role"
  options={[
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' }
  ]}
  placeholder="Choose your role"
/>
```

**Props:**
- `label`: string (optional)
- `options`: Array of { value, label }
- `error`: string (shows error state)
- `helperText`: string (shows below select)
- Standard HTML select props

### Card
```tsx
import { Card } from '@/components/ui'

<Card animate={true}>
  <h2>Card Content</h2>
</Card>
```

**Props:**
- `animate`: boolean (enables fade-in animation)
- `className`: string (additional CSS classes)

### Message
```tsx
import { Message } from '@/components/ui'

<Message type="success">
  Operation completed successfully!
</Message>
```

**Props:**
- `type`: 'success' | 'error' | 'info' | 'warning'
- `children`: React.ReactNode

## 🎯 Usage Guidelines

### Form Validation
All form components support validation states:
- Use `error` prop to show validation errors
- Use `helperText` for additional context
- Components automatically clear errors on user input

### Animations
- All components use subtle animations for better UX
- Loading states are handled automatically
- Hover and focus states provide visual feedback

### Accessibility
- All components are keyboard accessible
- Screen reader friendly with proper ARIA labels
- Focus management follows best practices

## 🚀 Examples

### Complete Form Example
```tsx
import { Card, Input, Select, Button, Message } from '@/components/ui'

function ProfileForm() {
  const [formData, setFormData] = useState({ name: '', role: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  return (
    <Card>
      <Input
        label="Display Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        error={errors.name}
        helperText="This will be visible to others"
      />
      
      <Select
        label="Role"
        value={formData.role}
        onChange={(e) => setFormData({...formData, role: e.target.value})}
        options={roleOptions}
        error={errors.role}
      />
      
      {message && <Message type={message.type}>{message.text}</Message>}
      
      <Button
        type="submit"
        loading={loading}
        onClick={handleSubmit}
      >
        Save Profile
      </Button>
    </Card>
  )
}
```

## 🎨 Customization

All components use Tailwind CSS classes and can be customized:
- Override styles with `className` prop
- Modify colors in `tailwind.config.js`
- Extend animations in component files

## 📱 Responsive Design

All components are mobile-first and responsive:
- Touch-friendly sizing on mobile
- Proper spacing on all screen sizes
- Accessible on all devices

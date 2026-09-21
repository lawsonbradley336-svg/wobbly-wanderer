# 🎨 The Wobbly Wanderer - Styling & Design Guide

## Design Philosophy

The Wobbly Wanderer embraces a **warm, inviting pub atmosphere** digitally. Every element is designed to feel friendly, playful, and engaging—like stepping into your favorite local.

## Color Palette

### Primary Colors
- **Amber Glow**: `#F59E0B` - The main brand color, warm and inviting like lamplight
- **Orange Pub**: `#F97316` - Secondary accent, energetic and celebratory
- **Dark Pub**: `#1F2937` - Primary background, dark but warm
- **Darker Pub**: `#111827` - Deepest background for depth

### Status Colors
- **Success/Open**: `#10B981` (Emerald) - For open pubs, completed challenges
- **Alert/Closed**: `#EF4444` (Red) - For closed pubs, warnings
- **Info**: `#3B82F6` (Blue) - For informational badges
- **Neutral Grays**: `#6B7280` - `#F3F4F6` for text and backgrounds

### Gradients
```css
/* Main gradient - used for headers, titles */
from-amber-glow to-orange-pub

/* Subtle gradients - used for backgrounds */
from-dark-pub to-darker-pub

/* Glowing effect - used for special highlights */
from-amber-glow/10 to-orange-pub/10
```

## Typography

### Font Family
- **Primary**: `Fredoka` (imported from Google Fonts)
- **Fallback**: system sans-serif

### Type Scale
```
Display: text-4xl font-bold (32px, 700 weight)
Heading 1: text-3xl font-bold (24px, 700 weight)
Heading 2: text-2xl font-bold (20px, 700 weight)
Heading 3: text-xl font-bold (18px, 700 weight)
Body Large: text-lg (16px, 400 weight)
Body: text-base (16px, 400 weight)
Body Small: text-sm (14px, 400 weight)
Caption: text-xs (12px, 400 weight)
```

### Text Colors
- **Primary Text**: `text-white` (#FFFFFF)
- **Secondary Text**: `text-gray-400` (#9CA3AF)
- **Tertiary Text**: `text-gray-500` (#6B7280)
- **Accented Text**: `text-amber-glow`, `text-orange-pub`

## Components

### Buttons

#### Primary Button (`.btn-primary`)
- Background: `bg-amber-glow`
- Text: `text-black` (bold)
- Hover: `hover:bg-orange-pub`
- Shadow: `shadow-lg shadow-amber-glow/50`
- Active: `active:scale-95`

**Usage**: Main call-to-action, form submissions
```html
<button class="btn-primary">Generate Crawl</button>
```

#### Secondary Button (`.btn-secondary`)
- Background: `bg-gray-700`
- Text: `text-white` (bold)
- Hover: `hover:bg-gray-600`
- Active: `active:scale-95`

**Usage**: Secondary actions, navigation
```html
<button class="btn-secondary">Cancel</button>
```

### Cards

#### Pub Card (`.card-pub`)
- Background: `bg-dark-pub`
- Border: `border border-gray-700`
- Hover: `hover:border-amber-glow`
- Shadow on Hover: `shadow-lg shadow-amber-glow/20`
- Radius: `rounded-xl`
- Padding: `p-4`

**Usage**: Pub listings, saved crawls, information containers
```html
<div class="card-pub">
  <h3>Pub Name</h3>
  <p>Pub details...</p>
</div>
```

### Badges

#### Open Badge (`.badge-open`)
- Background: `bg-green-900`
- Text: `text-green-200`
- Style: `rounded-full text-sm font-medium`
- Includes live dot animation

#### Closed Badge (`.badge-closed`)
- Background: `bg-red-900`
- Text: `text-red-200`
- Style: `rounded-full text-sm font-medium`

**Usage**: Open/closed status indicators
```html
<div class="badge-open">
  <div class="w-2 h-2 rounded-full bg-green-400 animate-bounce-soft"></div>
  Open Now
</div>
```

### Input Fields (`.input-field`)
- Background: `bg-gray-800`
- Border: `border border-gray-600`
- Focus: `focus:border-amber-glow focus:ring-1 focus:ring-amber-glow`
- Text: `text-white`
- Placeholder: `placeholder-gray-400`

**Usage**: Form inputs, text areas, search boxes
```html
<input type="text" class="input-field" placeholder="City name...">
```

### Pub Pins (`.pub-pin`)
- Background: `bg-amber-glow`
- Border: `border-2 border-orange-pub`
- Text: `text-black font-bold`
- Size: `w-10 h-10 rounded-full`
- Shadow: `shadow-lg`
- Hover: `hover:shadow-xl hover:shadow-amber-glow/50`

**Usage**: Numbered stop markers
```html
<div class="pub-pin">1</div>
```

## Animations

### Built-in Animations

#### Wobble (`animate-wobble`)
Used for: Loading states, emphasis
```css
animation: wobble 0.6s infinite;
@keyframes wobble {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-5px) rotate(-1deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-5px) rotate(1deg); }
}
```

#### Slide Up (`animate-slide-up`)
Used for: Component entrance, content reveal
```css
animation: slideUp 0.3s ease-out;
```

#### Slide Down (`animate-slide-down`)
Used for: Error messages, alerts
```css
animation: slideDown 0.3s ease-out;
```

#### Fade In (`animate-fade-in`)
Used for: Page transitions, subtle reveals
```css
animation: fadeIn 0.3s ease-out;
```

#### Scale In (`animate-scale-in`)
Used for: Modal-like components, emphasis
```css
animation: scaleIn 0.3s ease-out;
```

#### Pulse Glow (`animate-pulse-glow`)
Used for: Active status indicators, attention
```css
animation: pulseGlow 2s ease-in-out infinite;
```

#### Bounce Soft (`animate-bounce-soft`)
Used for: Subtle motion, playful emphasis
```css
animation: bounceSoft 0.8s ease-in-out infinite;
```

### Animation Staggering
Apply animation delays for sequential reveals:
```html
<div style="animation-delay: 0ms">Item 1</div>
<div style="animation-delay: 50ms">Item 2</div>
<div style="animation-delay: 100ms">Item 3</div>
```

## Responsive Design

### Breakpoints (Tailwind CSS)
- **Mobile**: `<640px` (default)
- **Tablet**: `md: 768px+`
- **Desktop**: `lg: 1024px+`
- **Large**: `xl: 1280px+`

### Mobile-First Approach
1. Design for mobile first
2. Add `md:` prefix for tablets and up
3. Responsive typography scales automatically
4. Navigation adapts: bottom bar on mobile, top nav on desktop

### Key Mobile Optimizations
- Bottom navigation bar for easy thumb access
- Large tap targets (minimum 44x44px)
- Full-width cards on small screens
- Stacked layouts on mobile, grid on desktop
- No hover states on touch devices

### Example Responsive Classes
```html
<!-- Text size -->
<h1 class="text-2xl md:text-4xl">Responsive Heading</h1>

<!-- Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Visibility -->
<div class="hidden md:block">Desktop only</div>
<div class="md:hidden">Mobile only</div>
```

## Spacing System

All spacing uses Tailwind's scale: `4px * n`

```
p-2 = 8px
p-4 = 16px
p-6 = 24px
p-8 = 32px
gap-4 = 16px
```

### Standard Spacing
- **Container Padding**: `px-4` (mobile), `px-6` (tablet+)
- **Component Padding**: `p-4` (cards, inputs)
- **Section Spacing**: `space-y-6` (sections), `space-y-4` (components)
- **Element Gaps**: `gap-3` (small), `gap-4` (medium), `gap-6` (large)

## Accessibility

### Focus States
All interactive elements have enhanced focus:
```css
:focus-visible {
  outline: 2px solid #F59E0B;
  outline-offset: 2px;
}
```

### Color Contrast
- Text on backgrounds meets WCAG AA standards (4.5:1 minimum)
- Status indicators use both color and icons (not color alone)
- Hover states provide clear feedback

### Keyboard Navigation
- Tab order follows document flow
- Buttons are fully keyboard accessible
- Modal-like components trap focus

## Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #111827;
}

::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5A6A7A;
}
```

## Dark Mode

The app is **dark-mode first**:
- All colors designed for dark backgrounds
- Text is light for readability
- Glowing amber accents provide warmth
- No light mode implementation (yet)

## Icon System

### Using Lucide React Icons
```tsx
import { MapPin, Clock, Star, Users, Trash2 } from 'lucide-react'

<MapPin size={16} className="text-amber-glow" />
```

### Icon Sizing
- **Micro**: `size={12}` - Within text
- **Small**: `size={16}` - Badge icons
- **Default**: `size={18}` - Button icons
- **Large**: `size={24}` - Navigation
- **XL**: `size={48}` - Empty states

## Gradient Usage

### Header Gradient
```css
bg-gradient-to-r from-darker-pub via-dark-pub to-darker-pub
border-b-2 border-amber-glow
```

### Text Gradient
```css
text-transparent bg-clip-text bg-gradient-to-r from-amber-glow to-orange-pub
```

### Subtle Background
```css
bg-gradient-to-r from-amber-glow/10 to-orange-pub/10
border border-amber-glow/50
```

## Hover & Interactive Effects

### Card Hover
```css
.card-pub:hover {
  border-color: #F59E0B;
  box-shadow: 0 10px 25px rgba(245, 158, 11, 0.2);
  transform: translateY(-2px);
}
```

### Button Active
```css
button:active {
  transform: scale(0.95);
}
```

### Text Hover
```css
transition-colors duration-300
hover:text-amber-glow
```

## Shadow System

### Subtle Shadow
```css
shadow-sm shadow-gray-900/50
```

### Medium Shadow (Default)
```css
shadow-lg shadow-amber-glow/20
```

### Strong Shadow (Emphasis)
```css
shadow-xl shadow-amber-glow/50
```

## CSS Classes Quick Reference

### Text Colors
- `.text-white` - Primary text
- `.text-gray-400` - Secondary text
- `.text-amber-glow` - Accent
- `.text-orange-pub` - Secondary accent
- `.text-green-400` - Success
- `.text-red-400` - Error

### Background Colors
- `.bg-darker-pub` - Deepest background
- `.bg-dark-pub` - Primary background
- `.bg-gray-800` - Input background
- `.bg-amber-glow` - Primary button
- `.bg-orange-pub` - Secondary button

### Common Utilities
- `.font-bold` - Emphasis
- `.font-medium` - Secondary emphasis
- `.rounded-lg` - Small radius (8px)
- `.rounded-xl` - Large radius (12px)
- `.rounded-full` - Circular
- `.transition-all duration-300` - Smooth animation

## Performance Tips

1. **Use CSS animations** over JavaScript when possible
2. **Limit keyframe complexity** for smooth 60fps animation
3. **Defer non-critical animations** on low-end devices
4. **Use transform/opacity** for best performance
5. **Avoid layout-triggering properties** in animations (width, height)

## Future Enhancements

- [ ] Light mode theme
- [ ] Custom color themes (e.g., festive mode, Halloween mode)
- [ ] Accessibility improvements (high contrast mode)
- [ ] Additional animation variations
- [ ] Micro-interactions (ripple effects, swipes)
- [ ] Haptic feedback support

---

For questions about the design, refer to the main README.md or open an issue on GitHub.

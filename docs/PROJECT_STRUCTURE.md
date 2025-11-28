# Portfolio Project Structure

This document outlines the organization and architecture of the premium portfolio website.

## 📁 Directory Structure

```
/
├── App.tsx                          # Main entry point
├── sections/                        # Page sections
│   ├── HeroSection.tsx             # Landing/hero section with 3D effects
│   ├── AboutSection.tsx            # About with stats and parallax
│   ├── ProjectsSection.tsx         # Projects showcase with scroll rail
│   ├── SkillsSection.tsx           # Interactive draggable skill cards
│   └── ContactSection.tsx          # Contact information and footer
├── components/                      # Reusable components
│   ├── Portfolio.tsx               # Main orchestrator component
│   ├── BubbleMenu.tsx              # Navigation menu with animations
│   ├── DecryptedText.tsx           # Text decryption animation effect
│   ├── SketchProfileImage.tsx      # Profile image with sketch effects
│   ├── Stack.tsx                   # Draggable card stack component
│   ├── figma/                      # Figma-related components
│   │   └── ImageWithFallback.tsx   # Protected image component
│   └── ui/                         # Shadcn UI components
│       └── ...                     # Various UI primitives
├── constants/                       # Data and configuration
│   ├── projectsData.ts             # Project information
│   ├── skillsData.ts               # Skills data and icon mappings
│   └── menuItems.ts                # Navigation configuration
└── styles/
    └── globals.css                 # Global styles and tokens

```

## 🎯 Component Hierarchy

```
App
└── Portfolio
    ├── BubbleMenu (Navigation)
    ├── HeroSection
    │   └── SketchProfileImage
    ├── AboutSection
    │   └── DecryptedText
    ├── ProjectsSection
    │   ├── DecryptedText
    │   └── ImageWithFallback
    ├── SkillsSection
    │   ├── DecryptedText
    │   └── Stack (Draggable cards)
    └── ContactSection
```

## 🔧 Key Features by Section

### HeroSection
- **Parallax scrolling** with background grid
- **Floating particles** animation
- **3D profile card** with sketch effects
- Social links with hover animations
- Responsive layout (mobile/desktop)

### AboutSection
- **Multi-layer parallax** (text moves differently than stats)
- **Rotating geometric shapes** in background
- Animated **stat cards** with hover effects
- **Decrypted text** animations
- Black text on white background with inverted scrolling

### ProjectsSection
- **5x viewport height** for extended scroll
- **Split-screen layout** (text left, images right)
- **Scroll-synced** project switching
- **Parallax backgrounds** moving in opposite directions
- **Diagonal animated lines** overlay
- Dynamic project info with smooth transitions
- Progress indicators

### SkillsSection
- **Draggable card stack** with physics
- **Rotating geometric shapes** in background
- **Hover color inversion** (white → black)
- Tech icons with react-icons
- Responsive card sizing
- Grid background with parallax

### ContactSection
- **Floating circles** with scale animations
- **Parallax grid** background
- Contact information with hover states
- Large typographic name display
- Social media links

## 📊 Data Organization

### constants/projectsData.ts
```typescript
- Project title
- Description
- Tech stack array
- Image URL
- Project number
```

### constants/skillsData.ts
```typescript
- Skill categories (Frontend, Backend, DevOps, Mobile)
- Tech arrays per category
- Icon mappings (react-icons)
- Category icons
```

### constants/menuItems.ts
```typescript
- Menu item labels
- Section hrefs
- Rotation values
- Hover styles
- scrollToSection utility function
```

## 🎨 Animation Technologies

- **Motion (Framer Motion)** - All animations and gestures
- **GSAP** - BubbleMenu animations
- **CSS Transforms** - 3D effects and rotations
- **Scroll-linked animations** - useScroll, useTransform
- **View-triggered animations** - useInView, whileInView

## 🚀 Performance Optimizations

- Component-level code splitting
- Lazy loading with motion animations
- Optimized scroll listeners
- Efficient re-renders with refs
- Responsive image loading

## 🎭 Design System

### Colors
- **Black**: `#000000` - Primary background
- **White**: `#ffffff` - Primary text and accents
- **Gray variants**: For secondary text

### Typography
- **Bold, uppercase headings** for impact
- **Tracked letterSpacing** for premium feel
- **Responsive font sizes** with Tailwind classes
- Custom line-heights for readability

### Spacing
- Consistent padding: `px-4 sm:px-6 lg:px-8`
- Section spacing: `py-16 sm:py-24 md:py-32`
- Responsive gaps in grids

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All sections are fully responsive with mobile-first approach.

## 🔌 External Dependencies

### Core
- React
- Motion (Framer Motion)
- GSAP

### Icons
- lucide-react
- react-icons (fa, si, di, tb)

### Utilities
- Tailwind CSS v4.0
- TypeScript

## 🛠️ Development Guidelines

### Adding a New Section
1. Create file in `/sections/`
2. Import in `/components/Portfolio.tsx`
3. Add navigation item in `/constants/menuItems.ts`
4. Implement parallax and animations
5. Ensure responsive design

### Adding New Projects
1. Update `/constants/projectsData.ts`
2. Add project object with all fields
3. Ensure images are optimized
4. Test scroll animations

### Modifying Animations
- Parallax ranges in useTransform
- Animation durations in motion props
- Scroll offsets in useScroll
- Viewport triggers in whileInView

## 📄 File Naming Conventions

- **Sections**: `SectionNameSection.tsx` (PascalCase)
- **Components**: `ComponentName.tsx` (PascalCase)
- **Constants**: `dataName.ts` (camelCase)
- **Utilities**: `utilityName.ts` (camelCase)

## 🎯 Code Organization Principles

1. **Separation of Concerns** - Each file has single responsibility
2. **Data-driven** - Content separated from components
3. **Reusability** - Shared components in /components
4. **Type Safety** - TypeScript throughout
5. **Performance** - Optimized animations and renders
6. **Maintainability** - Clean, documented code

## 🔄 State Management

Currently uses React's built-in state management:
- `useState` for component state
- `useRef` for DOM references
- `useScroll` for scroll-linked values
- `useTransform` for derived animation values

No external state management needed for current scope.

## 📝 Notes

- No variations folder anymore - single premium version
- All animations are scroll-based parallax
- Black and white color scheme throughout
- Bold, senior developer aesthetic
- Mobile-responsive with touch interactions

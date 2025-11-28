# Development Guide

## 🚀 Getting Started

This portfolio is built with React, TypeScript, Motion (Framer Motion), and Tailwind CSS v4.0. All code is organized with clear separation of concerns for maximum maintainability.

## 📁 Project Architecture

### Core Principles
1. **Component-based** - Each section is a standalone component
2. **Data-driven** - Content separated from presentation
3. **Type-safe** - Full TypeScript coverage
4. **Performance-focused** - Optimized animations and renders
5. **Mobile-first** - Responsive design from ground up

### Folder Structure
```
/sections/      → Page sections (Hero, About, Projects, etc.)
/components/    → Reusable UI components
/constants/     → Data and configuration
/utils/         → Helper functions and utilities
/styles/        → Global styles
```

## 🛠️ Common Development Tasks

### Adding a New Project

1. **Update data file**: `/constants/projectsData.ts`
```typescript
{
  title: "PROJECT NAME",
  description: "Brief description",
  tech: ["React", "Node.js", "PostgreSQL"],
  image: "https://...",
  number: "05",
}
```

2. The ProjectsSection will automatically render it with scroll animations.

### Adding a New Skill Category

1. **Update data file**: `/constants/skillsData.ts`
```typescript
{
  id: 5,
  category: "CATEGORY NAME",
  tech: ["Tech1", "Tech2", "Tech3"],
  icon: IconComponent,
}
```

2. Make sure the icon is imported from react-icons.

### Modifying Navigation

Edit `/constants/menuItems.ts`:
```typescript
{
  label: "section",
  href: "#section-id",
  ariaLabel: "Section Name",
  rotation: 8,
  hoverStyles: { bgColor: "#ffffff", textColor: "#000000" },
}
```

### Creating a New Section

1. **Create component**: `/sections/NewSection.tsx`
```typescript
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function NewSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section id="new-section" ref={ref} className="min-h-screen">
      {/* Your content */}
    </section>
  );
}
```

2. **Import in Portfolio**: `/components/Portfolio.tsx`
```typescript
import { NewSection } from "../sections/NewSection";

// Add to JSX:
<NewSection />
```

3. **Add navigation**: Update `/constants/menuItems.ts`

## 🎨 Styling Guidelines

### Color Palette
```css
Black:     #000000
White:     #ffffff
Gray-400:  Use Tailwind's gray-400
Gray-600:  Use Tailwind's gray-600
```

### Typography
- Use **uppercase** for headings and labels
- Apply **tracking-wider** or **tracking-[0.3em]** for premium feel
- Use **font-bold** sparingly - let typography scale do the work

### Spacing
```tsx
// Section padding
className="px-4 sm:px-6 lg:px-8"
className="py-16 sm:py-24 md:py-32"

// Container
className="max-w-7xl mx-auto"

// Gaps
className="gap-12 sm:gap-16 lg:gap-20"
```

### Responsive Design
```tsx
// Font sizes
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"

// Widths
className="w-full lg:w-1/2"

// Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
```

## 🎬 Animation Patterns

### Parallax Scrolling
```typescript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"],
});

const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
```

### Viewport Animations
```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
```

### Hover Effects
```typescript
<motion.div
  whileHover={{ scale: 1.05, rotate: 2 }}
  whileTap={{ scale: 0.95 }}
>
```

### Infinite Animations
```typescript
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "linear",
  }}
>
```

## 🎯 Performance Tips

### 1. Use Refs for Scroll Targets
```typescript
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref });
```

### 2. Optimize Re-renders
- Use `viewport={{ once: true }}` for one-time animations
- Avoid inline function definitions in motion props

### 3. Lazy Load Images
```typescript
<ImageWithFallback
  src={imageSrc}
  alt={altText}
  className="w-full h-full object-cover"
/>
```

### 4. Debounce Resize Handlers
```typescript
import { debounce } from "../utils/responsive";

useEffect(() => {
  const handleResize = debounce(() => {
    // Handle resize
  }, 150);

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

## 📱 Responsive Breakpoints

```typescript
// Tailwind breakpoints
sm:  640px   // Mobile landscape, small tablets
md:  768px   // Tablets
lg:  1024px  // Small desktops
xl:  1280px  // Large desktops
2xl: 1536px  // Extra large screens
```

Use the helper functions from `/utils/responsive.ts`:
```typescript
import { isMobile, isTablet, isDesktop } from "../utils/responsive";

if (isMobile()) {
  // Mobile-specific logic
}
```

## 🐛 Common Issues & Solutions

### Issue: Animations not triggering
**Solution**: Ensure component has `ref` and `viewport={{ once: true }}`

### Issue: Scroll not smooth
**Solution**: Check `scrollToSection` in `/constants/menuItems.ts`

### Issue: Images not loading
**Solution**: Use `ImageWithFallback` component, not plain `<img>`

### Issue: Stack cards not draggable
**Solution**: Check `cardDimensions` and ensure proper responsive values

### Issue: Text looks cramped on mobile
**Solution**: Use responsive classes: `text-2xl sm:text-3xl md:text-4xl`

## 🔧 Utility Functions

### Animation Utilities (`/utils/animations.ts`)
```typescript
import { parallaxRanges, transitionPresets } from "../utils/animations";

// Use preset ranges
const y = useTransform(scrollYProgress, [0, 1], parallaxRanges.medium);

// Use preset transitions
<motion.div transition={transitionPresets.smooth}>
```

### Responsive Utilities (`/utils/responsive.ts`)
```typescript
import { getDeviceType, getCardDimensions } from "../utils/responsive";

const device = getDeviceType(); // "mobile" | "tablet" | "desktop"
const dimensions = getCardDimensions(); // { width: number, height: number }
```

## 📝 Code Style

### TypeScript
- Use explicit types for component props
- Prefer `interface` over `type` for objects
- Use `const` assertions for literal types

### React
- Functional components only
- Use hooks for state and effects
- Extract complex logic into custom hooks

### Naming Conventions
- **Components**: PascalCase (`HeroSection.tsx`)
- **Functions**: camelCase (`scrollToSection`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_ITEMS`)
- **Files**: camelCase for utilities, PascalCase for components

### Import Order
1. React and third-party libraries
2. Motion/animation libraries
3. Internal components
4. Constants and utilities
5. Types and interfaces

Example:
```typescript
import { useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import { MyComponent } from "../components/MyComponent";
import { projectsData } from "../constants/projectsData";
import { getDeviceType } from "../utils/responsive";
```

## 🧪 Testing Checklist

Before committing changes:

- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify smooth scrolling works
- [ ] Check all animations trigger
- [ ] Ensure images load properly
- [ ] Test menu navigation
- [ ] Verify hover states work
- [ ] Check console for errors
- [ ] Test on different browsers

## 🚀 Deployment

The portfolio is production-ready:
- All animations are optimized
- Images use fallback component
- Responsive across all devices
- No console errors
- TypeScript compiled successfully

## 📚 Additional Resources

### Motion (Framer Motion)
- [Motion Documentation](https://motion.dev)
- useScroll, useTransform, useInView hooks
- Animation variants and transitions

### Tailwind CSS v4.0
- Utility-first CSS framework
- Custom tokens in `/styles/globals.css`
- No config file needed (v4.0)

### React Icons
- [React Icons](https://react-icons.github.io/react-icons/)
- fa, si, di, tb icon sets
- Import specific icons only

## 💡 Best Practices

1. **Keep sections focused** - Each section does one thing well
2. **Extract repeated code** - Use utilities and constants
3. **Mobile-first** - Design for mobile, enhance for desktop
4. **Performance matters** - Use refs, optimize re-renders
5. **Type everything** - Full TypeScript coverage
6. **Document decisions** - Comment complex logic
7. **Test thoroughly** - Check all breakpoints
8. **Keep it simple** - Don't over-engineer

## 🎓 Learning Path

To understand this codebase:

1. Start with `/App.tsx` and `/components/Portfolio.tsx`
2. Read `/sections/HeroSection.tsx` to understand parallax
3. Study `/sections/ProjectsSection.tsx` for scroll-sync
4. Explore `/components/Stack.tsx` for drag interactions
5. Review `/utils/` for reusable patterns
6. Examine `/constants/` for data structure

Happy coding! 🚀

# Animation Guide

This guide covers all animation patterns used in the portfolio and how to implement them.

## 📚 Table of Contents
1. [Parallax Scrolling](#parallax-scrolling)
2. [Viewport Animations](#viewport-animations)
3. [Hover & Tap Effects](#hover--tap-effects)
4. [Infinite Animations](#infinite-animations)
5. [Text Effects](#text-effects)
6. [3D Transforms](#3d-transforms)
7. [Performance Tips](#performance-tips)

---

## Parallax Scrolling

### Basic Parallax
Element moves at different speed than scroll.

```typescript
const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"],
});

const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

<motion.div ref={ref} style={{ y }}>
  {/* Content */}
</motion.div>
```

**How it works:**
- `scrollYProgress` goes from 0 to 1 as you scroll
- `useTransform` maps that 0-1 to pixel values
- `y` moves element 200px down as you scroll

### Multi-layer Parallax
Different elements move at different speeds.

```typescript
const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);

<motion.div style={{ y: bgY }}>Background</motion.div>
<motion.div style={{ y: contentY }}>Content</motion.div>
```

### Opacity + Scale + Position
Combine multiple properties.

```typescript
const y = useTransform(scrollProgress, [0, 0.3], [0, -200]);
const opacity = useTransform(scrollProgress, [0, 0.2, 0.3], [1, 0.5, 0]);
const scale = useTransform(scrollProgress, [0, 0.3], [1, 0.8]);

<motion.section style={{ y, opacity, scale }}>
  {/* Fades out, shrinks, and moves up as you scroll */}
</motion.section>
```

### Scroll Offsets
Control when animation starts and ends.

```typescript
// Animate while section is in viewport
offset: ["start start", "end start"]

// Animate entire scroll through section
offset: ["start start", "end end"]

// Animate as element enters/exits
offset: ["start end", "end start"]
```

---

## Viewport Animations

### Fade Up
Fade in and slide up when entering viewport.

```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  {/* Content */}
</motion.div>
```

**Props:**
- `initial`: Starting state (hidden, below)
- `whileInView`: Target state (visible, normal position)
- `viewport={{ once: true }}`: Only animate once
- `viewport={{ amount: 0.3 }}`: Trigger when 30% visible

### Staggered Children
Animate list items one by one.

```typescript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Delayed Animations
Add delay to specific elements.

```typescript
{stats.map((stat, index) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
    viewport={{ once: true }}
  >
    {stat.number}
  </motion.div>
))}
```

---

## Hover & Tap Effects

### Scale on Hover
Grow element slightly on hover.

```typescript
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  Click me
</motion.button>
```

### Lift Effect
Move up and scale on hover.

```typescript
<motion.div
  whileHover={{ y: -10, scale: 1.02 }}
  transition={{ duration: 0.3 }}
>
  {/* Card */}
</motion.div>
```

### Rotate on Hover
Add rotation for playful effect.

```typescript
<motion.div
  whileHover={{ scale: 1.1, rotate: 5 }}
  whileTap={{ scale: 0.9 }}
>
  {/* Element */}
</motion.div>
```

### Color Transition on Hover
Use Tailwind classes with transition.

```typescript
<div className="transition-all duration-500 hover:bg-black hover:text-white">
  {/* Content */}
</div>
```

### Group Hover Effects
Child animates when parent is hovered.

```typescript
<div className="group">
  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
    Show on hover
  </div>
</div>
```

---

## Infinite Animations

### Rotate Continuously
Spin element forever.

```typescript
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "linear",
  }}
>
  {/* Rotating element */}
</motion.div>
```

### Pulse Effect
Scale and fade continuously.

```typescript
<motion.div
  animate={{
    opacity: [0.2, 0.5, 0.2],
    scale: [1, 1.5, 1],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  {/* Pulsing dot */}
</motion.div>
```

### Float Up and Down
Gentle vertical movement.

```typescript
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  {/* Floating element */}
</motion.div>
```

### Multiple Random Particles
Generate and animate many particles.

```typescript
{[...Array(10)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-1 h-1 bg-white rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay: Math.random() * 2,
    }}
  />
))}
```

---

## Text Effects

### Decrypted Text
Custom component for text decryption effect.

```typescript
import DecryptedText from "../components/DecryptedText";

<DecryptedText
  text="HELLO WORLD"
  animateOn="view"
  speed={30}
  maxIterations={15}
/>
```

**Props:**
- `text`: Text to display
- `animateOn`: "view" | "hover" | "both"
- `speed`: Animation speed (lower = faster)
- `maxIterations`: How many random chars before revealing

### Tracked Letters
Wide letter spacing for premium feel.

```typescript
<h1 className="tracking-[0.3em] uppercase">
  PREMIUM
</h1>
```

### Gradient Text
Text with gradient color.

```typescript
<h1 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
  Gradient Text
</h1>
```

---

## 3D Transforms

### Perspective Container
Add depth to child elements.

```typescript
<div className="perspective-2000">
  <motion.div
    initial={{ rotateY: -30 }}
    animate={{ rotateY: 0 }}
    className="preserve-3d"
  >
    {/* 3D content */}
  </motion.div>
</div>
```

Add to globals.css:
```css
.perspective-2000 {
  perspective: 2000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}
```

### Rotate in 3D Space
Rotate element in 3D.

```typescript
<motion.div
  initial={{ rotateY: -30, rotateX: 10 }}
  whileHover={{ rotateY: 0, rotateX: 0 }}
  transition={{ duration: 0.6 }}
  className="preserve-3d"
>
  {/* Card */}
</motion.div>
```

---

## Performance Tips

### 1. Use `will-change` for Heavy Animations
```typescript
<motion.div
  style={{ willChange: "transform" }}
  animate={{ x: 100 }}
>
```

### 2. Use `viewport={{ once: true }}`
Prevents re-triggering animations on every scroll.

```typescript
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
```

### 3. Optimize with `layoutId`
For smooth element transitions between states.

```typescript
<motion.div layoutId="unique-id">
```

### 4. Use Transform Instead of Position
Transform is GPU-accelerated, position properties are not.

```typescript
// ✅ Good
<motion.div animate={{ x: 100 }} />

// ❌ Bad
<motion.div animate={{ left: 100 }} />
```

### 5. Debounce Resize Handlers
```typescript
const handleResize = debounce(() => {
  // Handle resize
}, 150);
```

### 6. Use Refs for Scroll Animations
Don't animate document scroll directly.

```typescript
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref });
```

---

## Common Patterns

### Section Entry Animation
Standard fade-up animation for sections.

```typescript
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
```

### Card Hover
Standard card hover effect.

```typescript
<motion.div
  whileHover={{ y: -10, scale: 1.02 }}
  className="transition-shadow hover:shadow-2xl"
>
```

### Background Parallax
Standard background movement.

```typescript
const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

<motion.div
  className="absolute inset-0"
  style={{ y: bgY }}
>
```

### Stagger List
Standard list stagger.

```typescript
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
    viewport={{ once: true }}
  >
))}
```

---

## Animation Debugging

### 1. Check Motion Dev Tools
Install React DevTools and Motion DevTools browser extensions.

### 2. Log Scroll Progress
```typescript
useEffect(() => {
  return scrollYProgress.on("change", (v) => {
    console.log("Scroll:", v);
  });
}, [scrollYProgress]);
```

### 3. Visualize Transform Values
```typescript
const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

<motion.div style={{ y }}>
  <div className="fixed top-0">
    y: {y.get()}
  </div>
</motion.div>
```

### 4. Slow Down Animations
```typescript
transition={{ duration: 5 }} // Slow down to debug
```

---

## Quick Reference

### Scroll Hook
```typescript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"],
});
```

### Transform Hook
```typescript
const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
```

### Viewport Hook
```typescript
const isInView = useInView(ref, { once: true, amount: 0.3 });
```

### Motion Value
```typescript
const x = useMotionValue(0);
```

Happy animating! 🎬

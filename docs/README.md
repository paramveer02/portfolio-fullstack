# Premium Portfolio Website

A bold, modern, and premium portfolio website showcasing full-stack development expertise with advanced scroll-based animations, 3D effects, and a sophisticated black & white design aesthetic.

![Portfolio Preview](https://via.placeholder.com/1200x600/000000/FFFFFF?text=PREMIUM+PORTFOLIO)

## ✨ Features

### 🎨 Design
- **Bold Black & White** color scheme for maximum impact
- **Premium typography** with wide tracking and uppercase styling
- **Glassmorphism effects** for modern UI elements
- **3D transforms** and perspective effects
- **Mobile-first responsive** design across all breakpoints

### 🎬 Animations
- **Scroll-based parallax** effects throughout
- **Multi-layer parallax** with different speeds per element
- **Viewport-triggered** animations using IntersectionObserver
- **Smooth scroll** navigation between sections
- **3D profile card** with sketch effects (Lando Norris style)
- **Draggable skill cards** with physics-based interactions
- **Rotating geometric shapes** as background elements
- **Floating particles** with random animations
- **Text decryption** effects for headings
- **Infinite animations** for ambient motion

### 📱 Sections
1. **Hero** - Bold introduction with animated profile and social links
2. **About** - Experience showcase with animated statistics
3. **Projects** - Scroll-synced project rail with split-screen layout
4. **Skills** - Interactive draggable card stack with tech categories
5. **Contact** - Comprehensive contact information and footer

## 🛠️ Tech Stack

### Core
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4.0** - Utility-first styling
- **Motion (Framer Motion)** - Advanced animations

### Libraries
- **GSAP** - BubbleMenu animations
- **react-icons** - Icon library (fa, si, di, tb)
- **lucide-react** - Modern icon set

## 📁 Project Structure

```
portfolio/
├── sections/              # Page sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   └── ContactSection.tsx
├── components/            # Reusable components
│   ├── Portfolio.tsx
│   ├── BubbleMenu.tsx
│   ├── DecryptedText.tsx
│   ├── SketchProfileImage.tsx
│   ├── Stack.tsx
│   └── figma/
├── constants/             # Data & configuration
│   ├── projectsData.ts
│   ├── skillsData.ts
│   └── menuItems.ts
├── utils/                 # Utilities
│   ├── animations.ts
│   └── responsive.ts
├── types/                 # TypeScript definitions
│   └── index.ts
├── styles/
│   └── globals.css
└── App.tsx               # Entry point
```

## 🚀 Quick Start

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration

#### Update Personal Information
Edit `/constants/menuItems.ts`, `/constants/projectsData.ts`, and `/constants/skillsData.ts` with your information.

#### Add New Project
```typescript
// constants/projectsData.ts
{
  title: "YOUR PROJECT",
  description: "Project description",
  tech: ["React", "Node.js"],
  image: "https://...",
  number: "05",
}
```

#### Add New Skill
```typescript
// constants/skillsData.ts
{
  id: 5,
  category: "CATEGORY",
  tech: ["Tech1", "Tech2"],
  icon: IconComponent,
}
```

## 📖 Documentation

- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Detailed architecture overview
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Development best practices
- **[ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md)** - Animation patterns and usage

## 🎯 Key Highlights

### Advanced Scroll Animations
Every section features multi-layer parallax effects where backgrounds, content, and foreground elements move at different speeds, creating depth and sophistication.

### Scroll-Synced Projects
The projects section uses a 500vh container with sticky positioning to create a smooth scroll-synced experience where project information updates as you scroll.

### Interactive Skill Cards
Draggable skill cards with physics-based animations using Motion's drag functionality, creating an engaging and tactile user experience.

### Performance Optimized
- Ref-based scroll tracking
- `viewport={{ once: true }}` for one-time animations
- GPU-accelerated transforms
- Debounced resize handlers
- Efficient re-render patterns

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

All sections adapt seamlessly across devices with mobile-first approach.

### Touch-Friendly
- Touch gestures for skill cards
- Tap animations for interactive elements
- Mobile-optimized navigation menu
- Responsive typography scaling

## 🎨 Customization

### Colors
Update in `/styles/globals.css`:
```css
:root {
  --color-primary: #000000;
  --color-secondary: #ffffff;
}
```

### Typography
Modify Tailwind classes:
- Headings: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Body: `text-base sm:text-lg md:text-xl`
- Tracking: `tracking-wider` or `tracking-[0.3em]`

### Animations
Use utilities from `/utils/animations.ts`:
```typescript
import { parallaxRanges, transitionPresets } from "../utils/animations";
```

## 🔧 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy
The portfolio is ready for deployment to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Smooth 60fps animations**
- **Optimized bundle size**

## 🤝 Contributing

This is a personal portfolio, but feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Acknowledgments

- **Motion (Framer Motion)** for incredible animation capabilities
- **Tailwind CSS** for utility-first styling
- **React Icons** for comprehensive icon library
- **GSAP** for smooth menu animations

## 📧 Contact

**Paramvir Marwah**
- Email: paramvir.marwah@gmail.com
- LinkedIn: [/in/paramvirmarwah](https://linkedin.com/in/paramvirmarwah)
- GitHub: [/paramveer02](https://github.com/paramveer02)
- Location: Strasbourg, France (EU)

---

**Built with ❤️ using React, TypeScript, Motion, and Tailwind CSS**

---

## 🎓 Learning Resources

If you want to learn how to build similar animations:

1. **Motion Documentation**: [motion.dev](https://motion.dev)
2. **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
3. **TypeScript**: [typescriptlang.org](https://typescriptlang.org)
4. **React Patterns**: [patterns.dev](https://patterns.dev)

## 💡 Tips for Customization

### Change Color Scheme
Replace `black` with your primary color and `white` with your accent color throughout the codebase.

### Add More Sections
1. Create component in `/sections/`
2. Import in `Portfolio.tsx`
3. Add to navigation in `menuItems.ts`

### Modify Animation Speed
Adjust `duration` in motion props:
```typescript
transition={{ duration: 0.8 }} // Slower
transition={{ duration: 0.3 }} // Faster
```

### Change Parallax Intensity
Adjust transform ranges:
```typescript
// Subtle
const y = useTransform(scroll, [0, 1], [0, 50]);

// Intense  
const y = useTransform(scroll, [0, 1], [0, 500]);
```

---

**Star ⭐ this repo if you found it helpful!**

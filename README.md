# Cute Sparkle Folio 🌟

A modern, interactive portfolio website built with **TanStack React Start**, **Vite**, **TypeScript**, and **Supabase**. Featuring beautiful UI components from Shadcn/UI and Tailwind CSS with smooth animations powered by Motion.

## Project Overview

This is a full-stack React application for showcasing a portfolio. It includes:
- 🎨 Beautiful hero section with animated blob background
- 📱 Responsive design with mobile-first approach
- 🔐 Supabase authentication integration
- 📊 Project showcase with bento card layouts
- 📧 Contact form with form validation
- ⚡ Server-side rendering (SSR) with TanStack React Start
- 🎯 Type-safe routing with TanStack Router
- 🎭 Smooth animations and transitions

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TanStack React Router** - Routing and navigation
- **TanStack React Query** - Data fetching & state management
- **TanStack React Start** - Full-stack React framework
- **Tailwind CSS 4** - Utility-first CSS
- **Shadcn/UI** - Pre-built accessible components
- **Motion (Framer Motion alternative)** - Animations
- **Lucide React** - Icon library
- **React Hook Form + Zod** - Form handling & validation

### Backend
- **Supabase** - Authentication & database
- **Cloudflare Workers** - Deployment platform (via Wrangler)

### Development
- **Bun** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** or **Bun 1.0+** installed
- **npm** or **bun** package manager
- **Git** for version control
- **Supabase account** (for authentication & database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cute-sparkle-folio
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Or using Bun
   bun install
   ```

## Configuration

### Environment Variables

1. **Create a `.env.local` file** in the project root:
   ```bash
   cp .env .env.local
   ```

2. **Get your Supabase credentials:**
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Create a new project or select existing one
   - Navigate to **Project Settings → API**
   - Copy the **Project URL** and **Anon Key**

3. **Update `.env.local` with your credentials:**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_PUBLISHABLE_KEY=your-anon-key
   ```

### Supabase Database Setup (Optional)

If you want to use database features locally with Supabase:

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Initialize local Supabase** (already set up in `supabase/` directory)
   ```bash
   supabase start
   ```

3. **View migrations**
   ```bash
   # Migrations are located in supabase/migrations/
   # They handle auth schema setup
   ```

4. **Stop local Supabase**
   ```bash
   supabase stop
   ```

## Running Locally

### Development Mode

Start the development server:

```bash
# Using npm
npm run dev

# Using Bun
bun dev
```

The application will be available at:
- **http://localhost:5173** (default Vite dev server)

The server supports:
- 🔥 Hot Module Replacement (HMR) for instant updates
- ⚡ Fast rebuild times with Vite
- 🐛 Full TypeScript support with source maps

### Build for Production

```bash
# Using npm
npm run build

# Using Bun
bun run build
```

Build outputs to `dist/` directory.

### Preview Production Build

```bash
# Using npm
npm run preview

# Using Bun
bun run preview
```

Preview the production build at **http://localhost:4173**

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## Project Structure

```
cute-sparkle-folio/
├── src/
│   ├── components/
│   │   ├── portfolio/          # Portfolio-specific components
│   │   │   ├── BentoCard.tsx   # Bento grid card layout
│   │   │   ├── ContactForm.tsx # Contact form component
│   │   │   ├── HeroBlob.tsx    # Animated hero blob
│   │   │   ├── ProjectCard.tsx # Project showcase card
│   │   │   └── TrackCard.tsx   # Track/experience card
│   │   └── ui/                 # Shadcn/UI components (auto-generated)
│   ├── hooks/                  # Custom React hooks
│   │   └── use-mobile.tsx      # Mobile detection hook
│   ├── integrations/           # External service integrations
│   │   └── supabase/           # Supabase client & auth
│   ├── lib/                    # Utility functions
│   │   ├── error-capture.ts    # Error handling
│   │   ├── error-page.ts       # Error page rendering
│   │   └── utils.ts            # Helper utilities
│   ├── routes/                 # TanStack Router pages
│   │   ├── __root.tsx          # Root layout
│   │   └── index.tsx           # Home page
│   ├── router.tsx              # Router configuration
│   ├── server.ts               # SSR server entry
│   ├── start.ts                # App initialization
│   └── styles.css              # Global styles
├── supabase/
│   ├── config.toml             # Supabase local config
│   └── migrations/             # Database migrations
├── public/                      # Static assets
├── components.json             # Shadcn/UI config
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite configuration
├── wrangler.jsonc              # Cloudflare Workers config
├── bunfig.toml                 # Bun package manager config
└── package.json                # Project dependencies
```

## Key Features

### 1. **Authentication with Supabase**
   - Email/password authentication
   - Social login support (configurable)
   - Secure session management with localStorage

### 2. **Server-Side Rendering**
   - Powered by TanStack React Start
   - Error handling with custom error pages
   - Middleware support for request processing

### 3. **Responsive UI Components**
   - Built with Shadcn/UI and Radix UI
   - Fully accessible (WCAG compliant)
   - Dark mode ready

### 4. **Type Safety**
   - Full TypeScript support
   - Zod schema validation
   - Type-safe routing with TanStack Router

## Development Workflow

### Adding New Pages

1. Create a new route file in `src/routes/`:
   ```typescript
   // src/routes/about.tsx
   import { createFileRoute } from "@tanstack/react-router";

   export const Route = createFileRoute("/about")({
     component: About,
   });

   function About() {
     return <div>About Page</div>;
   }
   ```

2. The router automatically includes the new route (TanStack Router file-based routing)

### Styling

- **Tailwind CSS** for utility classes
- **Motion** for animations
- **CSS Modules** optional for component-scoped styles

Example with Motion:
```typescript
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Adding New Components

Components follow Shadcn/UI patterns. To add UI components:
```bash
# The project already includes most common components
# Check src/components/ui/ for available components
```

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
# Vite will automatically try the next available port
# Or specify a port:
npm run dev -- --port 3000
```

### Supabase Connection Issues
1. Verify environment variables are set correctly:
   ```bash
   # Check .env.local
   echo $VITE_SUPABASE_URL
   echo $VITE_SUPABASE_PUBLISHABLE_KEY
   ```

2. Test Supabase connection:
   - Visit [Supabase Dashboard](https://app.supabase.com/)
   - Verify project is active
   - Confirm API keys haven't been rotated

### Build Errors
1. Clear cache and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. Check TypeScript errors:
   ```bash
   # TypeScript compilation should show errors
   npm run build
   ```

### Hot Module Replacement (HMR) Not Working
1. Check if firewall is blocking connections
2. Restart dev server:
   ```bash
   npm run dev
   ```

## Performance Tips

1. **Code Splitting** - TanStack Router automatically code-splits routes
2. **Image Optimization** - Use next-gen formats (WebP) for images
3. **Lazy Loading** - Implement route-level code splitting
4. **Bundle Analysis** - Use Vite's built-in analysis:
   ```bash
   npm run build -- --analyze
   ```

## Deployment

### Deploy to Cloudflare Workers

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Authenticate with Cloudflare**
   ```bash
   wrangler auth
   ```

3. **Deploy**
   ```bash
   npm run build
   wrangler deploy
   ```

Configuration is in `wrangler.jsonc` (already set up for this project)

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push and create PR
git push origin feature/your-feature
```

Code is linted and formatted before commits:
```bash
npm run lint
npm run format
```

## Contributing

1. Follow the existing code style (enforced by ESLint & Prettier)
2. Write TypeScript with proper types
3. Test components locally
4. Keep components small and reusable

## Resources

- 📚 [TanStack React Router Docs](https://tanstack.com/router/latest)
- 📚 [TanStack React Start Docs](https://tanstack.com/start/latest)
- 📚 [Supabase Documentation](https://supabase.com/docs)
- 📚 [Vite Documentation](https://vitejs.dev/)
- 📚 [Tailwind CSS Docs](https://tailwindcss.com/)
- 📚 [Shadcn/UI Components](https://ui.shadcn.com/)

## Helpful Commands Cheat Sheet

```bash
# Setup
npm install                   # Install dependencies
npm run dev                   # Start dev server

# Development
npm run lint                  # Check code quality
npm run format                # Format code
npm run dev                   # Run dev server

# Building
npm run build                 # Production build
npm run build:dev             # Dev mode build
npm run preview               # Preview prod build

# Database
supabase start                # Start local Supabase
supabase stop                 # Stop local Supabase
```

## License

This project is part of a personal portfolio. All rights reserved.

---

**Happy coding! 🚀**

For issues or questions, please check the troubleshooting section or refer to the official documentation for the respective tools.

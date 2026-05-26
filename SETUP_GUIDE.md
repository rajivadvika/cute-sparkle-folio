# Local Development Setup Guide

Quick reference guide for getting the Cute Sparkle Folio running on localhost.

## ⚡ Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
# or with Bun:
bun install
```

### 2. Setup Environment Variables
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_PUBLISHABLE_KEY=your-key
```

### 3. Start Development Server
```bash
npm run dev
```

Visit **http://localhost:5173** 🎉

---

## 🔑 Getting Supabase Credentials

1. **Create/Login to Supabase**
   - Go to https://app.supabase.com/
   - Sign in with GitHub or email

2. **Create a New Project** (if you don't have one)
   - Click "New project"
   - Choose a database password
   - Select region closest to you
   - Wait for provisioning (2-3 minutes)

3. **Get API Keys**
   - Navigate to **Project Settings** (gear icon)
   - Click **API** in the sidebar
   - Copy **Project URL** → `VITE_SUPABASE_URL`
   - Copy **anon/public** key → `VITE_SUPABASE_PUBLISHABLE_KEY`

4. **Update `.env.local`**
   ```env
   VITE_SUPABASE_URL=https://abc123.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
   SUPABASE_URL=https://abc123.supabase.co
   SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
   ```

---

## 📁 Project Layout

```
├── src/
│   ├── routes/          ← Add new pages here
│   ├── components/      ← React components
│   ├── hooks/           ← Custom hooks
│   ├── integrations/    ← External services (Supabase, etc.)
│   └── lib/             ← Utilities and helpers
├── public/              ← Static assets
├── supabase/            ← Database config (optional for local dev)
└── package.json
```

---

## 🚀 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on http://localhost:5173 |
| `npm run build` | Create production build |
| `npm run preview` | Test production build locally |
| `npm run lint` | Check code for issues |
| `npm run format` | Auto-format code |

---

## 📝 Creating Your First Route

Create a new file `src/routes/about.tsx`:

```typescript
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <h1 className="text-4xl font-bold">About Me</h1>
      <p className="mt-4 text-lg">This is the about page!</p>
    </motion.div>
  );
}
```

The route is automatically available at `/about` thanks to file-based routing! 🎯

---

## 🎨 Styling Tips

### Tailwind CSS
```tsx
<div className="bg-blue-500 p-4 rounded-lg hover:bg-blue-600">
  Styled with Tailwind
</div>
```

### Motion Animations
```tsx
import { motion } from "motion/react";

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Shadcn/UI Components
```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

<Card>
  <Button>Click</Button>
</Card>
```

---

## 🔍 Debugging

### View React DevTools
- Install [React Developer Tools](https://react-devtools-tutorial.vercel.app/) browser extension
- Open DevTools → Components tab

### Check Console Errors
- Open browser DevTools (F12)
- Look in Console tab for error messages
- TypeScript errors show during build

### Supabase Debugging
Check if Supabase client is initialized:
```typescript
// In browser console
import { getSupabaseClient } from '@/integrations/supabase/client'
getSupabaseClient()
```

---

## 🐛 Common Issues & Fixes

### Issue: "Missing Supabase environment variable"
**Solution:** Make sure `.env.local` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`

### Issue: Port 5173 already in use
**Solution:** 
```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or just use a different port:
npm run dev -- --port 3000
```

### Issue: Changes not appearing after editing files
**Solution:** 
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server (`npm run dev`)
- Check browser console for errors

### Issue: TypeScript errors everywhere
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run dev
```

---

## 📦 Package Manager: npm vs Bun

This project supports both **npm** and **Bun**:

```bash
# Using npm
npm install
npm run dev

# Using Bun (faster ⚡)
bun install
bun dev
```

Choose based on your preference. Both work identically for this project.

---

## 🔐 Authentication (Optional)

Supabase auth is already integrated. To use it:

1. Go to Supabase dashboard
2. Enable Auth providers (Email, GitHub, Google, etc.)
3. Update auth configuration in `src/integrations/supabase/auth-middleware.ts`

---

## 📱 Testing Responsive Design

In browser DevTools:
1. Press F12 to open DevTools
2. Click device toggle icon (top-left)
3. Select different device sizes
4. Test at:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

---

## 🎯 Next Steps

1. ✅ Get app running with `npm run dev`
2. ✅ Explore existing components in `src/components/`
3. ✅ Create a new page in `src/routes/`
4. ✅ Add styling with Tailwind CSS
5. ✅ Deploy to Cloudflare Workers when ready

---

## 📚 Learning Resources

- **React:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/docs/
- **TanStack Router:** https://tanstack.com/router/latest
- **Tailwind CSS:** https://tailwindcss.com/
- **Supabase:** https://supabase.com/docs
- **Vite:** https://vitejs.dev/

---

## ✨ Pro Tips

1. **Use VS Code extensions:**
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux/React-Native snippets
   - TypeScript Vue Plugin

2. **Keyboard shortcuts:**
   - `Ctrl+K Ctrl+C` → Comment line (VS Code)
   - `Alt+Shift+F` → Format document
   - `Ctrl+Shift+P` → Command palette

3. **Performance:**
   - Check bundle size: `npm run build`
   - Enable Bun for faster installs
   - Use `npm run preview` to test production build

---

**Happy coding! Questions? Check the main README.md** 🚀

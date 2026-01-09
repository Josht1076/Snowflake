# Tailwind UI Theme (WindPalette-style) — Final Setup

This document packages everything needed to support the copied WindPalette-style snippets:

- ✅ `bg-gradient-radial` utility
- ✅ tokens like `primary-dark`, `icons-dark`, etc.
- ✅ CSS variables used by the snippets: `--card-background`, `--card-border`, `--gradient-color-0/1`
- ✅ optional interface primitives (`.ui-card`, `.ui-btn`)
- ✅ quick fix so radial gradients actually render (adds gradient stops)

---

## 1) `tailwind.config.ts`

> Drop this at your project root.

```ts
import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: "0.75rem",
      },

      // Enables: className="bg-gradient-radial"
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },

      // “Interface-y” shadow similar to WindPalette cards
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.06), 0 10px 30px rgba(0,0,0,0.10)",
      },

      // Color tokens used in your copied snippets
      colors: {
        // Brand colors (from your WindPalette theme)
        primary: "#38B2AC",
        "primary-dark": "#2C8F8A",

        secondary: "#d3c7f5",
        "secondary-dark": "#b9a6ee",

        accent: "#006EDB",
        "accent-dark": "#0057AD",

        // Status colors (for your demo buttons)
        info: "#0EA5E9",
        "info-dark": "#0284C7",

        success: "#22C55E",
        "success-dark": "#16A34A",

        warning: "#F59E0B",
        "warning-dark": "#D97706",

        error: "#EF4444",
        "error-dark": "#DC2626",

        // Neutral buttons
        neutral: "#64748B",
        "neutral-dark": "#475569",

        // Icon button group in your snippet
        icons: "#0F172A",
        "icons-dark": "#1E293B",
      },
    },
  },
  plugins: [],
} satisfies Config
```

## 2) 'global.css'

> Add this to your global stylesheet (e.g. app/globals.css or src/styles/globals.css).

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Used by inline gradient styles in copied HTML */
    --gradient-color-0: #38b2ac; /* primary */
    --gradient-color-1: #006edb; /* accent */

    /* Used by: bg-[var(--card-background)] border-[var(--card-border)] */
    --card-background: rgba(255, 255, 255, 0.90);
    --card-border: rgba(255, 255, 255, 0.18);
  }

  .dark {
    /* You can keep these the same or adjust for better dark-mode contrast */
    --gradient-color-0: #38b2ac;
    --gradient-color-1: #7c3aed; /* optional: richer contrast in dark mode */

    --card-background: rgba(15, 23, 42, 0.75);
    --card-border: rgba(255, 255, 255, 0.10);
  }
}
```

## 3) IMPORTANT: Make bg-gradient-radial actually show up

### Your snippet uses:
```jsx
<div className="... bg-gradient-radial ..." />
```

But bg-gradient-radial needs gradient stops (from-*, via-*, to-*) or it renders as “nothing”.

### Recommended overlay (works immediately)
```jsx
<div className="absolute inset-0 bg-gradient-radial from-primary/40 via-accent/20 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-300" />
```

### Recommended button fill (matches the site vibe)
```jsx
<button className="px-6 py-2 bg-gradient-radial from-primary/35 via-accent/15 to-transparent border border-primary-dark rounded-lg text-white font-medium shadow-lg backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:border-primary transition-all duration-300 flex items-center gap-2">

```
## 4) Optional: Interface Primitives (Cards + Buttons)

> Add this BELOW the base layer in globals.css to reduce repeated utility classes.

```css
@layer components {
  .ui-card {
    @apply rounded-xl border border-[var(--card-border)] bg-[var(--card-background)] shadow-soft;
  }

  .ui-btn {
    @apply inline-flex items-center gap-2 rounded-lg px-6 py-2 font-medium
           transition-all duration-300 hover:scale-105 hover:shadow-xl
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60;
  }

  .ui-btn-primary {
    @apply ui-btn bg-primary text-white hover:bg-primary-dark;
  }

  .ui-btn-secondary {
    @apply ui-btn bg-secondary text-white hover:bg-secondary-dark;
  }

  .ui-btn-accent {
    @apply ui-btn bg-accent text-white hover:bg-accent-dark;
  }

  .ui-btn-outline-primary {
    @apply ui-btn border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white;
  }
}

```

## 5) Example: Your copied cards using the theme
## A) Gradient statistic card (uses CSS variables)

```html
<div
  class="bg-gradient-to-br h-full p-6 rounded-xl shadow-lg flex justify-center items-center flex-col border border-[var(--card-border)]"
  style="background: linear-gradient(135deg, var(--gradient-color-0), var(--gradient-color-1));"
>
  <h2 class="text-white text-4xl font-semibold">Users</h2>
  <p class="text-white text-6xl font-bold mt-2">1,872</p>
  <p class="text-white mt-2 text-xl">New users in past 30 days</p>
</div>
```

## B) Card container using --card-background / --card-border
```html
<div class="bg-[var(--card-background)] border border-[var(--card-border)] aspect-square p-6 rounded-xl shadow-lg space-y-4">
  <h2 class="text-primary text-3xl font-semibold">Today</h2>
  ...
</div>
```

## 6) Notes / knobs you’ll likely want to tweak

- --gradient-color-0/1 drive the “hero” gradients on those stat cards and side accents.
- --card-background and --card-border define the “glass” look and can be adjusted for more/less opacity.
- The *-dark values are hover states. If you want exact “same hue, darker shade” math, replace them with computed values.

## 7) Quick checklist

 - Tailwind installed + working
 - tailwind.config.ts points to your actual content paths
 - globals.css imported once globally
 - Your radial gradients include from/via/to stops
 - (Optional) .dark class toggled on <html> or <body> for dark mode
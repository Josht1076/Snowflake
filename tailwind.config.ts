import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: "0.75rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // WindPalette: Enables bg-gradient-radial
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },

      // WindPalette: Interface-y shadow
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.06), 0 10px 30px rgba(0,0,0,0.10)",
      },

      colors: {
        // Existing shadcn/ui colors (preserved)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          // WindPalette: Add direct color access
          base: "#38b2ac",
          dark: "#2c8b87",
          50: '#dcf4f3',
          100: '#c8eeec',
          200: '#a1e2de',
          300: '#7bd5d1',
          400: '#54c9c3',
          500: '#38b2ac',
          600: '#2c8b87',
          700: '#206461',
          800: '#133e3c',
          900: '#071716',
          950: '#010303',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          // WindPalette: Add direct color access
          base: "#d3c7f5",
          dark: "#b19ced",
          50: '#ffffff',
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
          400: '#f5f2fd',
          500: '#d3c7f5',
          600: '#b19ced',
          700: '#8f70e6',
          800: '#6d45de',
          900: '#5024cc',
          950: '#4720b6',
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          // WindPalette: Add direct color access
          base: "#006EDB",
          dark: "#0057AD",
          50: '#ffffff',
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
          400: '#fff3df',
          500: '#ffe1ac',
          600: '#ffcf79',
          700: '#ffbc46',
          800: '#ffaa13',
          900: '#df8e00',
          950: '#c67e00',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // WindPalette: Status colors
        info: "#0EA5E9",
        "info-dark": "#0284C7",
        success: "#22C55E",
        "success-dark": "#16A34A",
        warning: "#F59E0B",
        "warning-dark": "#D97706",
        error: "#EF4444",
        "error-dark": "#DC2626",
        neutral: "#64748B",
        "neutral-dark": "#475569",
        icons: "#0F172A",
        "icons-dark": "#1E293B",
      },
    },
  },
  plugins: [],
};
export default config;


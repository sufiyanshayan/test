import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm near-black, not a pure/cold black — reads as char & smoke, not "AI dark mode"
        charcoal: {
          DEFAULT: "#17140F",
          soft: "#211C15",
          line: "#3A3226"
        },
        // Warm off-white for light mode, closer to unbleached paper than cream
        bone: {
          DEFAULT: "#F3EEE2",
          soft: "#EAE2D0"
        },
        // Turmeric / gold-foil — the primary accent, used sparingly
        saffron: {
          DEFAULT: "#E3A21A",
          dim: "#B87F12"
        },
        // Grill-flame / chili — reserved for CTAs and price tags only
        ember: {
          DEFAULT: "#C4341F",
          dim: "#8F2416"
        },
        // Iznik-tile teal — the surprise counter-accent, used for tags & badges
        teal: {
          DEFAULT: "#0F3D3E",
          soft: "#175456"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-public-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"]
      },
      backgroundImage: {
        "grain": "url('/textures/grain.png')"
      },
      keyframes: {
        "cut-reveal": {
          "0%": { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          "100%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
        },
        "spit-turn": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" }
        }
      },
      animation: {
        "cut-reveal": "cut-reveal 1.1s cubic-bezier(0.77,0,0.18,1) forwards",
        "spit-turn": "spit-turn 6s linear infinite"
      }
    }
  },
  plugins: []
} satisfies Config;

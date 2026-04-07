import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        jost: ["var(--font-jost)", "sans-serif"],
        pinyon: ["var(--font-pinyon)", "cursive"],
      },
      colors: {
        gold: {
          DEFAULT: "#C9A96E",
          light: "#E8D5B0",
          deep: "#A07840",
          muted: "#D4C4A8",
        },
        cream: {
          DEFAULT: "#FAF8F4",
          warm: "#F5F2ED",
          sand: "#E8E0D4",
        },
        stone: "#B8A898",
        charcoal: "#2C2520",
        dark: "#1A1410",
        spa: {
          dark: "#1A1410",
          text: "#3D3530",
          muted: "#7A6E68",
          olive: "#8B9467",
        },
      },
      transitionDuration: {
        "400": "400ms",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A96E, #E8D5B0, #A07840)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)",
      },
    },
  },
  plugins: [],
};
export default config;

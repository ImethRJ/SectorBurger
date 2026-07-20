# 🍔 Sector Burger — Sri Lankan Fusion Smash Burgers

A modern, high-performance web application for **Sector Burger**, an artisanal burger restaurant blending classic smash burger techniques with authentic Sri Lankan spices and flavors (Jaffna chili paste, Seeni Sambol, Kochchi kick, Pol Sambol).

---

## ✨ Features

- **🍔 Signature Fusion Menu**: Interactive showcase featuring signature burgers with custom spice levels (*Nai Miris Level*, *Kochchi Kick*, etc.) and flavor tags.
- **🛒 Interactive Cart & Drawer**: Full cart management with real-time total calculations, quantity adjustments, slide-over drawer animation, and order checkout flow.
- **🎨 Custom Design System**: Tailored Sri Lankan spice color tokens (`sector-charcoal`, `sector-cinnamon`, `sector-turmeric`, `sector-kochchi`), glassmorphism, dynamic micro-animations, and responsive 6-tier breakpoints.
- **📱 Responsive & Mobile-First**: Optimized layout with sleek mobile navigation and zero-scrollbar horizontal scroll strips.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI & Logic**: [React 19](https://react.dev/) & TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss`
- **Fonts**: [Geist Sans & Geist Mono](https://vercel.com/font)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.x** or later installed.

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd sector-burger
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or your local IP address) in your browser.

---

## 📁 Project Structure

```text
sector-burger/
├── app/
│   ├── favicon.ico
│   ├── globals.css      # Tailwind v4 theme config, custom utilities & animations
│   ├── layout.tsx       # Root layout & font configurations
│   └── page.tsx         # Sector Burger home page & interactive cart logic
├── public/              # Static assets
├── next.config.ts       # Next.js origin & image pattern settings
├── package.json         # Project scripts & dependencies
└── tsconfig.json        # TypeScript configuration
```

---

## 📜 Available Scripts

- `npm run dev` — Launches dev server bound to `0.0.0.0`
- `npm run build` — Generates optimized production build
- `npm run start` — Starts production server
- `npm run lint` — Runs ESLint checks

# ⚡ VoltEdge — Premium Tech Store Bangladesh

> **Live Application**: [https://volt-edge-site.vercel.app/](https://volt-edge-site.vercel.app/)

VoltEdge is Bangladesh's premier dark-themed tech e-commerce platform and custom PC building ecosystem. Designed with high-performance aesthetics, interactive tools, and real-time backend architecture.

---

## 🌐 Live Demo & Endpoints

- **Live Web App**: [https://volt-edge-site.vercel.app/](https://volt-edge-site.vercel.app/)
- **Local Frontend**: `http://localhost:4028`
- **Local API Backend**: `http://localhost:5000/api/health`

---

## ✨ Key Features

- **📱 Image-Led Mobile Hero & Composed Banner**: Composed image-first mobile hero card (`< 1024px`) with swipeable CSS scroll-snap slides, single-row spec chips, and surfaced interactive tool cards.
- **💻 Unmodified Pixel-Identical Desktop Grid**: 2-column campaign hero banner with interactive bento budget estimator and 0% EMI preview widgets for desktop (`≥ 1024px`).
- **🤖 Lumi AI Sales Consultant**: Floating interactive AI shopping assistant providing real-time PC component recommendations, budget advice, and product inquiries.
- **🖥️ Custom PC Builder**: Live compatibility engine checking CPU socket fit (AM5, LGA1700, LGA1851), memory generation (DDR4/DDR5), form factor clearance, and estimated PSU wattage headroom (+25% safety margin).
- **🛒 Dynamic Cart & Wishlist System**: Real-time Header badge counters, interactive glassmorphism confirmation modals for clearing items, 1-click cross icon removal, and `localStorage` persistence.
- **💳 0% EMI Calculator**: Monthly installment preview supporting 30+ major Bangladeshi banks across 3 to 36-month tenures.
- **🛡️ Warranty Check & 🔄 Trade-In Tools**: Official serial number lookup for warranty claims and automated hardware valuation estimator.
- **🚀 Dynamic Product Routing**: Dynamic routes at `/product/[slug]` with automated SEO metadata generation.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Space Grotesk & DM Sans typography.
- **Backend API**: Express.js (Node.js API in `/server`), Zod schema validation.
- **Database & Auth**: Supabase PostgreSQL, Row-Level Security (RLS) policies, automatic profile triggers.
- **Deployment**: Vercel (Frontend) & Render/Node (Express API).

---

## 📁 Project Architecture

```
voltedge/
├── public/                 # Static images, assets, and branding
├── server/                 # Express.js backend API
│   ├── src/
│   │   ├── routes/         # API endpoints (products, cart, orders, pcbuilder, warranty, tradein, auth)
│   │   ├── middleware/     # Zod validator & error handler
│   │   └── lib/            # Supabase service client
│   ├── package.json
│   └── tsconfig.json
├── shared/                 # Shared modules (compatibility engine)
│   └── compatibility.ts
├── src/
│   ├── app/                # Next.js App Router pages & routes
│   │   ├── components/     # Homepage sections & mobile/desktop hero components
│   │   ├── product/[slug]/ # Dynamic product detail pages
│   │   ├── pc-builder/     # Custom PC builder page
│   │   ├── cart-checkout/  # Shopping cart & checkout flow
│   │   └── wishlist/       # Saved wishlist page
│   ├── components/         # Reusable UI components (Header, Footer, ProductCard, AI Chat)
│   ├── contexts/           # Cart, Wishlist, Auth, and Theme context providers
│   ├── lib/                # API client (`api.ts`), mock data, Supabase client
│   └── styles/             # Tailwind & design token CSS
├── supabase/
│   └── migrations/         # Production SQL schema & RLS policies
├── next.config.mjs
└── package.json
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js 18+ and `npm`

### 2. Installation
Clone the repository and install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 3. Running Development Servers

Start the Next.js frontend (Port `4028`):
```bash
npm run dev
```

In a second terminal, start the Express backend API (Port `5000`):
```bash
cd server
npm run dev
```

Open [http://localhost:4028](http://localhost:4028) in your browser.

---

## 📦 Utility Scripts

- `npm run dev` — Start Next.js development server on port `4028`
- `npm run type-check` — Run TypeScript compiler type-checking (`tsc --noEmit`)
- `npm run lint` — Run ESLint code quality checks
- `npm run format` — Format all code using Prettier
- `npm run build` — Create production build for Next.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { formatPrice } from '@/lib/mockData';

const SLIDES = [
  {
    id: 1,
    eyebrow: 'Flagship Graphics Processor',
    headline: 'ROG Strix RTX 4090',
    headlineAccent: '24GB GDDR6X',
    sub: 'ASUS ROG Strix GeForce RTX 4090 24GB — ultimate 4K gaming & AI performance with zero compromise.',
    specs: ['24GB GDDR6X', 'DLSS 3.5 & Ray Tracing', '450W TDP', '3x Axial-Tech Fans'],
    cta: 'Shop RTX 4090',
    ctaHref: '/category',
    secondaryCta: 'Build Custom PC',
    secondaryHref: '/pc-builder',
    price: 245000,
    productName: 'ASUS ROG Strix RTX 4090 24GB',
    image: '/assets/images/hero_rtx4090_user.jpg',
    alt: 'ASUS ROG Strix GeForce RTX 4090 Graphics Card and Box',
    badge: 'RTX 4090 Flagship',
    endsIn: '31 JUL 2026 11:47 AM',
  },
  {
    id: 2,
    eyebrow: 'Pro Gaming Laptop',
    headline: 'ROG Strix G16',
    headlineAccent: 'Core i9 + RTX 4070',
    sub: 'Intel Core i9-13980HX · RTX 4070 8GB · 16" 240Hz QHD Display — ultra-fast gaming on RGB backlit keyboard.',
    specs: ['Intel i9 13980HX', 'RTX 4070 8GB', '16" 240Hz QHD Display', 'Aura Sync RGB'],
    cta: 'View Gaming Laptops',
    ctaHref: '/category',
    secondaryCta: 'Compare Laptops',
    secondaryHref: '/category',
    price: 185000,
    productName: 'ASUS ROG Strix G16 Gaming Laptop',
    image: '/assets/images/hero_laptop_user.jpg',
    alt: 'High Performance Gaming Laptop on desk with RGB keyboard',
    badge: 'ROG Series',
    endsIn: '30 JUL 2026 06:00 PM',
  },
  {
    id: 3,
    eyebrow: 'World Cup Mega Offer',
    headline: 'Custom Rig Offer',
    headlineAccent: 'Free World Cup Jersey',
    sub: 'Build any RTX 40 Series Custom PC Rig & receive a Free Official World Cup Jersey + Gaming Headset.',
    specs: ['Free World Cup Jersey', 'FREE Assembly & Testing', '0% EMI Available', '3 Year Warranty'],
    cta: 'View Campaign',
    ctaHref: '/offers',
    secondaryCta: 'Build PC Now',
    secondaryHref: '/pc-builder',
    price: 115000,
    productName: 'ASUS ROG Strix Custom Rig',
    image: '/assets/images/hero_rtx4090_user.jpg',
    alt: 'ASUS ROG Strix Graphics Card & Custom Rig',
    badge: 'FREE GIFT',
    endsIn: '28 JUL 2026 12:00 AM',
  },
];

const CATEGORY_RAIL = [
  { label: 'Gaming Laptops', icon: 'LaptopIcon', href: '/category' },
  { label: 'Desktop PCs', icon: 'CpuIcon', href: '/category' },
  { label: 'Graphics Cards', icon: 'MonitorIcon', href: '/category' },
  { label: '180Hz Monitors', icon: 'TvIcon', href: '/category' },
  { label: 'Power Supplies', icon: 'ZapIcon', href: '/category' },
  { label: 'Accessories', icon: 'HeadphonesIcon', href: '/category' },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Interactive Budget Estimator Widget state
  const [estBudget, setEstBudget] = useState(95000);

  // Interactive EMI Widget state
  const [selectedBank, setSelectedBank] = useState('City Bank AMEX');

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setAnimating(false);
      }, 5500);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  const goToSlide = (i: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(i);
      setAnimating(false);
    }, 300);
  };

  // Helper for Budget Estimator recommendations
  const getBudgetRec = (budget: number) => {
    if (budget < 60000) {
      return { cpu: 'Core i3 12100F', gpu: 'GTX 1650 4GB', fps: '~160 FPS', tier: 'Entry 1080p' };
    }
    if (budget < 110000) {
      return { cpu: 'Ryzen 5 5600', gpu: 'RTX 4060 8GB', fps: '~240 FPS', tier: 'Sweet Spot 1080p' };
    }
    if (budget < 170000) {
      return { cpu: 'Intel i5-13400F', gpu: 'RTX 4070 12GB', fps: '~140 FPS (2K)', tier: 'Ultra 2K Gaming' };
    }
    return { cpu: 'Ryzen 7 7800X3D', gpu: 'RTX 4080 Super', fps: '~200+ FPS (4K)', tier: '4K Beast' };
  };

  const rec = getBudgetRec(estBudget);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-background pt-4 pb-10">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,229,160,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 w-full relative z-10 space-y-8">
        {/* Main 2-Column Split Hero Grid */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-stretch">
          {/* Left Column: Multi-Slide Campaign Carousel Banner */}
          <div className="relative bg-surface/90 border border-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl min-h-[460px]">
            {/* Slide Content Layout */}
            <div className={`grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_360px] gap-6 items-center transition-all duration-300 ${animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
              {/* Left Side of Carousel: Name, Specs & Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                    <span className="pulse-dot" />
                    <span className="text-accent text-xs font-semibold font-display uppercase tracking-widest">{slide.eyebrow}</span>
                    <span className="text-xs text-muted-foreground border-l border-accent/20 pl-2">{slide.badge}</span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white font-bold flex items-center gap-1.5 border border-white/10">
                    <Icon name="ClockIcon" size={12} className="text-amber-400" />
                    ENDS IN : {slide.endsIn}
                  </span>
                </div>

                {/* Product Title */}
                <div>
                  <h1 className="font-display font-black leading-[1.05] tracking-tight text-2xl sm:text-3xl lg:text-4xl text-foreground">
                    {slide.headline}
                  </h1>
                  <p className="font-display font-bold text-xl sm:text-2xl text-accent mt-0.5">
                    {slide.headlineAccent}
                  </p>
                </div>

                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-lg">
                  {slide.sub}
                </p>

                {/* Key Specs Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {slide.specs.map((spec) => (
                    <span key={spec} className="px-2.5 py-1 rounded-lg bg-elevated border border-border text-[11px] font-semibold text-foreground">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Price (Positioned Above Buttons) */}
                <div className="pt-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block font-medium">Official Price</span>
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-accent tabular-nums">{formatPrice(slide.price)}</span>
                </div>

                {/* Action Buttons (Positioned Directly Under Price - Full Width on Mobile) */}
                <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-2.5 pt-1">
                  <Link
                    href={slide.ctaHref}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-xs hover:glow-accent transition-all hover:scale-[1.02] touch-manipulation text-center w-full sm:w-auto min-h-[44px]"
                  >
                    {slide.cta}
                    <Icon name="ArrowRightIcon" size={14} />
                  </Link>
                  <Link
                    href={slide.secondaryHref}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-xs hover:border-accent/40 transition-all touch-manipulation text-center w-full sm:w-auto min-h-[44px]"
                  >
                    {slide.secondaryCta}
                  </Link>
                </div>
              </div>

              {/* Right Side of Carousel: Full High-Res Product Image Stage */}
              <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-2xl border border-border/60 bg-gradient-to-b from-elevated/80 to-surface/80 flex items-center justify-center p-3 shadow-2xl group overflow-hidden">
                {/* Background Soft Radial Glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(0,229,160,0.18) 0%, transparent 70%)',
                  }}
                />

                <AppImage
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority
                  className="object-contain hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative z-10"
                />

                <span className="absolute bottom-2 left-2 right-2 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-[10px] font-display font-bold text-white border border-white/10 truncate text-center z-20">
                  {slide.productName}
                </span>
              </div>
            </div>

            {/* Slide Pagination & Controls */}
            <div className="flex items-center justify-start pt-4 mt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(i)}
                    className={`rounded-full transition-all duration-300 min-w-[8px] min-h-[8px] touch-manipulation ${
                      i === current ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-border hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Bento Feature Widgets */}
          <div className="flex flex-col gap-4">
            {/* Bento Widget 1: Quick PC Budget Estimator */}
            <div className="bg-surface/90 border border-accent/40 rounded-3xl p-5 shadow-lg space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                      <Icon name="CpuIcon" size={16} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm text-foreground">Quick PC Budget Estimator</h3>
                      <span className="text-[10px] text-muted-foreground block">Slide to calculate your dream PC</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-accent/20 border border-accent/40 text-accent font-bold px-2 py-0.5 rounded-full">
                    {rec.tier}
                  </span>
                </div>

                {/* Budget Slider */}
                <div className="space-y-1 my-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-muted-foreground">Selected Budget:</span>
                    <span className="font-display font-extrabold text-lg text-accent tabular-nums">
                      {formatPrice(estBudget)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={40000}
                    max={250000}
                    step={5000}
                    value={estBudget}
                    onChange={(e) => setEstBudget(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>৳40k Budget</span>
                    <span>৳150k Gaming</span>
                    <span>৳250k Extreme</span>
                  </div>
                </div>

                {/* Dynamic Recommendation Card */}
                <div className="p-3 bg-elevated rounded-xl border border-border space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recommended CPU:</span>
                    <span className="font-semibold text-foreground">{rec.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recommended GPU:</span>
                    <span className="font-semibold text-foreground">{rec.gpu}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/50 pt-1">
                    <span className="text-muted-foreground">Est. Valorant FPS:</span>
                    <span className="font-bold text-accent tabular-nums">{rec.fps}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/pc-builder"
                className="w-full py-2.5 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-xs flex items-center justify-center gap-1.5 hover:glow-accent-sm transition-all"
              >
                Build This PC Now
                <Icon name="ArrowRightIcon" size={14} />
              </Link>
            </div>

            {/* Bento Widget 2: 0% EMI Monthly Installment Calculator */}
            <div className="bg-surface/90 border border-border rounded-3xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Icon name="CreditCardIcon" size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-foreground">0% EMI Preview</h3>
                    <span className="text-[10px] text-muted-foreground block">3 to 36 Months on 30+ Banks</span>
                  </div>
                </div>
                <Link href="/emi-calculator" className="text-xs text-accent hover:underline font-semibold">
                  Calculate →
                </Link>
              </div>

              {/* Bank Selector Pills */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {['City Bank AMEX', 'BRAC Bank', 'EBL Mastercard']?.map((bank) => (
                  <button
                    key={bank}
                    onClick={() => setSelectedBank(bank)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap ${
                      selectedBank === bank
                        ? 'bg-accent/20 border border-accent/40 text-accent'
                        : 'bg-elevated border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>

              {/* Installment breakdown sample */}
              <div className="flex items-center justify-between p-3 bg-elevated rounded-xl border border-border text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block">Sample 36 Months EMI:</span>
                  <span className="font-display font-extrabold text-sm text-foreground tabular-nums">
                    From ৳ 5,138 / month
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  0% Interest
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature 1: Interactive Quick Category Rail */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block">
            Popular Categories Quick Access:
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORY_RAIL.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface border border-border hover:border-accent/40 text-xs font-semibold text-foreground hover:text-accent transition-all shrink-0 hover:-translate-y-0.5 shadow-sm"
              >
                <Icon name={cat.icon as 'LaptopIcon'} size={16} className="text-accent" />
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Feature 2: Trust & Reliability Counter Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-surface border border-border rounded-2xl text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <Icon name="TruckIcon" size={18} />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">2-Hour Express Delivery</p>
              <p className="text-[10px] text-muted-foreground">Dhaka Metro Same Day</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Icon name="ShieldCheckIcon" size={18} />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">100% Official Warranty</p>
              <p className="text-[10px] text-muted-foreground">Global Brand & UCC Partner</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Icon name="CreditCardIcon" size={18} />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">0% EMI Available</p>
              <p className="text-[10px] text-muted-foreground">3 to 36 Months on 30+ Banks</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Icon name="MapPinIcon" size={18} />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">12 Physical Stores</p>
              <p className="text-[10px] text-muted-foreground">IDB, Multiplan, Uttara & CTG</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
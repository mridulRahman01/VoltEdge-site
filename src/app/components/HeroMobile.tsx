'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { formatPrice } from '@/lib/mockData';
import MobileToolsCarousel from './MobileToolsCarousel';

const SLIDES = [
  {
    id: 1,
    categoryTag: 'PRO GAMING LAPTOP',
    badge: 'ROG Series',
    endsInShort: '29d 06h 14m',
    headline: 'ROG Strix G16',
    headlineAccent: 'Core i9 + RTX 4070',
    sub: 'Intel Core i9-13980HX · RTX 4070 8GB · 16" 240Hz QHD Display — ultra-fast gaming on RGB backlit keyboard.',
    specs: ['Intel i9 13980HX', 'RTX 4070 8GB', '16" 240Hz QHD', 'Aura Sync RGB'],
    cta: 'View Gaming Laptops',
    ctaHref: '/category',
    secondaryCta: 'Compare Laptops',
    secondaryHref: '/category',
    price: 185000,
    oldPrice: 210000,
    discount: 12,
    emiText: 'EMI from ৳5,138/mo · 0% interest',
    productName: 'ASUS ROG Strix G16 Gaming Laptop',
    image: '/assets/images/hero_laptop_user.jpg',
    alt: 'High Performance Gaming Laptop on desk with RGB keyboard',
  },
  {
    id: 2,
    categoryTag: 'FLAGSHIP GPU',
    badge: 'RTX 4090',
    endsInShort: '31d 11h 47m',
    headline: 'ROG Strix RTX 4090',
    headlineAccent: '24GB GDDR6X',
    sub: 'ASUS ROG Strix GeForce RTX 4090 24GB — ultimate 4K gaming & AI performance with zero compromise.',
    specs: ['24GB GDDR6X', 'DLSS 3.5 & Ray Tracing', '450W TDP', '3x Axial Fans'],
    cta: 'Shop RTX 4090',
    ctaHref: '/category',
    secondaryCta: 'Build Custom PC',
    secondaryHref: '/pc-builder',
    price: 245000,
    oldPrice: 275000,
    discount: 11,
    emiText: 'EMI from ৳6,805/mo · 0% interest',
    productName: 'ASUS ROG Strix RTX 4090 24GB',
    image: '/assets/images/hero_rtx4090_user.jpg',
    alt: 'ASUS ROG Strix GeForce RTX 4090 Graphics Card and Box',
  },
  {
    id: 3,
    categoryTag: 'MEGA CAMPAIGN',
    badge: 'FREE GIFT',
    endsInShort: '28d 12h 00m',
    headline: 'Custom Rig Offer',
    headlineAccent: 'Free World Cup Jersey',
    sub: 'Build any RTX 40 Series Custom PC Rig & receive a Free Official World Cup Jersey + Gaming Headset.',
    specs: ['Free World Cup Jersey', 'FREE Assembly', '0% EMI', '3Y Warranty'],
    cta: 'View Campaign',
    ctaHref: '/offers',
    secondaryCta: 'Build PC Now',
    secondaryHref: '/pc-builder',
    price: 115000,
    oldPrice: 135000,
    discount: 15,
    emiText: 'EMI from ৳3,194/mo · 0% interest',
    productName: 'ASUS ROG Strix Custom Rig',
    image: '/assets/images/hero_rtx4090_user.jpg',
    alt: 'ASUS ROG Strix Graphics Card & Custom Rig',
  },
];

const CATEGORY_TILES = [
  { label: 'Laptops', icon: 'LaptopIcon', href: '/category' },
  { label: 'Desktops', icon: 'CpuIcon', href: '/category' },
  { label: 'GPUs', icon: 'MonitorIcon', href: '/category' },
  { label: 'Monitors', icon: 'TvIcon', href: '/category' },
  { label: 'PSU', icon: 'ZapIcon', href: '/category' },
  { label: 'Accessories', icon: 'HeadphonesIcon', href: '/category' },
];

export default function HeroMobile() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchPaused = useRef(false);

  // Auto-advance carousel every 6s unless user interacts
  useEffect(() => {
    const timer = setInterval(() => {
      if (touchPaused.current) return;
      setCurrentSlide((prev) => {
        const next = (prev + 1) % SLIDES.length;
        if (trackRef.current) {
          trackRef.current.scrollTo({
            left: next * trackRef.current.clientWidth,
            behavior: 'smooth',
          });
        }
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const width = trackRef.current.clientWidth;
    const scrollLeft = trackRef.current.scrollLeft;
    const idx = Math.round(scrollLeft / width);
    if (idx !== currentSlide && idx >= 0 && idx < SLIDES.length) {
      setCurrentSlide(idx);
    }
  };

  return (
    <div className="lg:hidden space-y-6 pt-2 pb-6">
      {/* Composed Image-Led Hero Card */}
      <div className="mx-4 bg-surface border border-border rounded-2xl overflow-hidden shadow-xl relative">
        {/* Swipeable Track via CSS Scroll-Snap */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onTouchStart={() => (touchPaused.current = true)}
          onTouchEnd={() => setTimeout(() => (touchPaused.current = false), 8000)}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory overscroll-x-contain"
        >
          {SLIDES.map((slide) => (
            <div key={slide.id} className="w-full shrink-0 snap-center flex flex-col">
              {/* Layer 1 — Image Stage (top ~55% of card, 4:3 aspect) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface flex items-center justify-center p-4">
                {/* Radial Accent Glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(0,229,160,0.12) 0%, transparent 70%)',
                  }}
                />

                {/* Bottom-to-top Scrim Gradient */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      'linear-gradient(to top, var(--surface) 0%, rgba(18,18,20,0.8) 12%, transparent 60%)',
                  }}
                />

                {/* Top-Left Overlay: Status Pill */}
                <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold">
                  <span className="pulse-dot" />
                  <span className="text-accent uppercase tracking-wide font-display">
                    {slide.categoryTag}
                  </span>
                  <span className="text-muted-foreground border-l border-white/20 pl-1.5">
                    {slide.badge}
                  </span>
                </div>

                {/* Top-Right Overlay: Countdown Pill */}
                <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-elevated/80 backdrop-blur-md text-[10px] font-mono text-white font-bold flex items-center gap-1 border border-white/10">
                  <Icon name="ClockIcon" size={12} className="text-amber-400" />
                  <span>{slide.endsInShort}</span>
                </div>

                {/* Main Product Image */}
                <div className="relative w-full h-full z-0 flex items-center justify-center">
                  <AppImage
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain hover:scale-105 transition-transform duration-500 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
                  />
                </div>
              </div>

              {/* Layer 2 — Content (bottom ~45% of card, 16px padding) */}
              <div className="p-4 space-y-3 bg-surface relative z-20 -mt-2">
                {/* Title Block */}
                <div>
                  <h1 className="font-display font-bold text-[26px] leading-tight tracking-tight text-foreground">
                    {slide.headline}
                  </h1>
                  <p className="font-display font-semibold text-lg text-accent mt-0.5">
                    {slide.headlineAccent}
                  </p>
                </div>

                {/* Description (1 line maximum on mobile) */}
                <p className="text-xs text-muted-foreground line-clamp-1 leading-normal">
                  {slide.sub}
                </p>

                {/* Spec Chips (Single-Row Horizontal Scroll Strip) */}
                <div className="relative">
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar snap-x py-0.5 pr-6">
                    {slide.specs.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 rounded-full bg-elevated border border-border text-[11px] font-semibold text-foreground whitespace-nowrap snap-start shrink-0"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  {/* Right Edge Fade Mask */}
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-surface to-transparent pointer-events-none" />
                </div>

                {/* Price Row (Single line, space-between) */}
                <div className="pt-1 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest block font-medium">
                        OFFICIAL PRICE
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display font-extrabold text-[28px] text-accent tabular-nums leading-none">
                          {formatPrice(slide.price)}
                        </span>
                        {slide.oldPrice && (
                          <span className="text-xs text-muted-foreground line-through tabular-nums">
                            {formatPrice(slide.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    {slide.discount && (
                      <span className="px-2.5 py-1 rounded-full bg-danger/20 border border-danger/40 text-danger font-display font-bold text-xs">
                        -{slide.discount}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{slide.emiText}</p>
                </div>

                {/* CTA Row */}
                <div className="space-y-2 pt-1">
                  <Link
                    href={slide.ctaHref}
                    className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:glow-accent-sm transition-all shadow-md touch-manipulation min-h-[48px]"
                  >
                    {slide.cta}
                    <Icon name="ArrowRightIcon" size={16} />
                  </Link>

                  <div className="text-center pt-0.5">
                    <Link
                      href={slide.secondaryHref}
                      className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 font-medium transition-colors inline-block py-1 touch-manipulation min-h-[36px] flex items-center justify-center"
                    >
                      {slide.secondaryCta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Layer 3 — Slide Affordance Dots */}
        <div className="flex items-center justify-center gap-1.5 py-3 border-t border-border/40 bg-surface">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentSlide(i);
                if (trackRef.current) {
                  trackRef.current.scrollTo({
                    left: i * trackRef.current.clientWidth,
                    behavior: 'smooth',
                  });
                }
              }}
              className={`rounded-full transition-all duration-300 min-w-[6px] min-h-[6px] touch-manipulation ${
                i === currentSlide ? 'w-5 h-2 bg-accent' : 'w-1.5 h-1.5 bg-border'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Surfaced Tools Carousel (Budget Estimator & EMI Preview) */}
      <MobileToolsCarousel />

      {/* Popular Categories Quick Access Tiles */}
      <div className="space-y-2 px-4 pt-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
          POPULAR CATEGORIES
        </span>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 snap-x overscroll-x-contain">
          {CATEGORY_TILES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="w-[76px] h-[76px] shrink-0 snap-start bg-surface border border-border hover:border-accent/40 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all touch-manipulation"
            >
              <Icon name={cat.icon as 'LaptopIcon'} size={20} className="text-accent" />
              <span className="text-[11px] font-semibold text-foreground text-center leading-none">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

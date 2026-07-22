'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { formatPrice } from '@/lib/mockData';

const SLIDES = [
{
  id: 1,
  eyebrow: 'New Arrival',
  headline: 'Build Beyond',
  headlineAccent: 'Limits.',
  sub: 'RTX 4090 · Ryzen 9 · DDR5 · NVMe — configure your ultimate rig with zero compromise.',
  cta: 'Shop Now',
  ctaHref: '/category',
  secondaryCta: 'Build a PC',
  secondaryHref: '/pc-builder',
  price: 195000,
  productName: 'NVIDIA GeForce RTX 4090',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_129f2ee11-1773886516440.png",
  alt: 'NVIDIA RTX 4090 graphics card with triple-fan cooler on pure black background, dramatic rim lighting highlighting green accents',
  badge: 'RTX 40 Series'
},
{
  id: 2,
  eyebrow: 'Gaming Laptops',
  headline: 'Dominate',
  headlineAccent: 'Every Frame.',
  sub: 'Intel i9 · RTX 4070 · 240Hz QHD Display — engineered for the competitive edge.',
  cta: 'View Laptops',
  ctaHref: '/category',
  secondaryCta: 'Compare Models',
  secondaryHref: '/category',
  price: 185000,
  productName: 'ASUS ROG Strix G16',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e06b657f-1778557614857.png",
  alt: 'Black gaming laptop open on dark desk, backlit keyboard glowing, dramatic low-key studio lighting',
  badge: 'ROG Series'
},
{
  id: 3,
  eyebrow: 'Flagship Phones',
  headline: 'Capture',
  headlineAccent: 'Everything.',
  sub: 'Snapdragon 8 Gen 3 · 200MP Camera · 5000mAh — the pro photographer in your pocket.',
  cta: 'Shop Phones',
  ctaHref: '/category',
  secondaryCta: 'Compare Phones',
  secondaryHref: '/category',
  price: 145000,
  productName: 'Samsung Galaxy S24 Ultra',
  image: "https://images.unsplash.com/photo-1707410420102-faff6eb0e033",
  alt: 'Samsung Galaxy S24 Ultra titanium smartphone on dark matte surface, subtle studio lighting',
  badge: 'Galaxy AI'
}];


export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setAnimating(false);
      }, 300);
    }, 5000);
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

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-background">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(0,229,160,0.06) 0%, transparent 70%)'
        }} />
      
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      
      <div className="max-w-[1400px] mx-auto px-4 w-full py-10 sm:py-16 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center min-h-[75vh] sm:min-h-[80vh]">
          {/* Left: Text */}
          <div className={`transition-all duration-300 ${animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4 sm:mb-6">
              <span className="pulse-dot" />
              <span className="text-accent text-xs font-semibold font-display uppercase tracking-widest">{slide.eyebrow}</span>
              <span className="text-xs text-muted-foreground border-l border-accent/20 pl-2">{slide.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold leading-[1.02] tracking-tight mb-4 sm:mb-6" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}>
              {slide.headline}{' '}
              <span className="text-accent">{slide.headlineAccent}</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-5 sm:mb-8 max-w-lg">
              {slide.sub}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5 sm:mb-8">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Starting at</span>
              <span className="font-display font-bold text-2xl sm:text-3xl text-accent tabular-nums">{formatPrice(slide.price)}</span>
              <span className="text-xs text-muted-foreground">EMI available</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 min-h-[48px] rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation">
                {slide.cta}
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
              <Link
                href={slide.secondaryHref}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 min-h-[48px] rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-sm hover:border-accent/40 hover:text-accent transition-all touch-manipulation">
                {slide.secondaryCta}
              </Link>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-2 mt-8 sm:mt-10">
              {SLIDES.map((s, i) =>
              <button
                key={s.id}
                onClick={() => goToSlide(i)}
                className={`rounded-full transition-all duration-300 min-w-[8px] min-h-[8px] touch-manipulation ${
                i === current ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-border hover:bg-muted-foreground'}`
                }
                aria-label={`Go to slide ${i + 1}`} />
              )}
              <span className="ml-3 text-xs text-muted-foreground tabular-nums">{current + 1}/{SLIDES.length}</span>
            </div>
          </div>

          {/* Right: Product image — hidden on very small screens, shown below text on mobile */}
          <div className={`relative flex items-center justify-center transition-all duration-300 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,229,160,0.08) 0%, transparent 70%)'
              }} />
            
            <div className="relative w-full max-w-sm sm:max-w-lg aspect-square lg:aspect-[4/3]">
              <AppImage
                src={slide.image}
                alt={slide.alt}
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 50vw"
                className="object-contain drop-shadow-2xl" />
            </div>

            {/* Floating product name badge */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 lg:bottom-8 lg:left-8 lg:right-auto bg-surface/90 backdrop-blur-md border border-border rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-accent shrink-0" style={{ boxShadow: '0 0 8px var(--accent)' }} />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Featured Product</p>
                <p className="text-xs sm:text-sm font-display font-semibold text-foreground truncate">{slide.productName}</p>
              </div>
              <Link href="/product-detail" className="ml-auto p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-elevated hover:bg-accent/10 transition-colors touch-manipulation">
                <Icon name="ArrowRightIcon" size={14} className="text-accent" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
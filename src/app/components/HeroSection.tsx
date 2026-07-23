'use client';

import React from 'react';
import HeroMobile from './HeroMobile';
import HeroDesktop from './HeroDesktop';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-background pt-2 sm:pt-4 pb-6 sm:pb-10">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,229,160,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-0 sm:px-4 w-full relative z-10">
        {/* Mobile Viewport Hero (< 1024px) */}
        <HeroMobile />

        {/* Unmodified Desktop Viewport Hero (>= 1024px) */}
        <HeroDesktop />
      </div>
    </section>
  );
}

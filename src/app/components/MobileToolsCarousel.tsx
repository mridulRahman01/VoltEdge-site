'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import BudgetEstimatorCard from './BudgetEstimatorCard';
import EmiPreviewCard from './EmiPreviewCard';

export default function MobileToolsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const scrollLeft = containerRef.current.scrollLeft;
    const idx = Math.round(scrollLeft / (width * 0.85));
    setActiveIndex(Math.min(2, Math.max(0, idx)));
    if (!interacted) setInteracted(true);
  };

  return (
    <div className="lg:hidden space-y-2 mt-4">
      <div className="flex items-center justify-between px-4">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          INTERACTIVE TECH TOOLS
        </span>
        {!interacted && (
          <span className="text-[10px] text-accent animate-pulse font-medium flex items-center gap-1">
            Swipe for more →
          </span>
        )}
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 py-1 overscroll-x-contain"
      >
        {/* Card 1: Quick Budget Estimator */}
        <div className="w-[85vw] max-w-[340px] shrink-0 snap-center h-[340px]">
          <BudgetEstimatorCard />
        </div>

        {/* Card 2: 0% EMI Preview */}
        <div className="w-[85vw] max-w-[340px] shrink-0 snap-center h-[340px]">
          <EmiPreviewCard />
        </div>

        {/* Card 3: PC Builder Teaser */}
        <div className="w-[85vw] max-w-[340px] shrink-0 snap-center h-[340px]">
          <div className="bg-surface/95 border border-border rounded-3xl p-5 shadow-lg flex flex-col justify-between h-full space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                  <Icon name="CpuIcon" size={16} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground">
                    Custom PC Builder
                  </h3>
                  <span className="text-[10px] text-muted-foreground block">
                    Auto Socket & TDP Verification
                  </span>
                </div>
              </div>

              <div className="p-4 bg-elevated rounded-xl border border-border space-y-2 text-xs">
                <p className="text-foreground font-semibold">
                  Build a 100% Compatible PC in 5 Minutes
                </p>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  We check socket fit, RAM generation (DDR4/DDR5), case clearance, and PSU wattage
                  headroom automatically.
                </p>
              </div>
            </div>

            <Link
              href="/pc-builder"
              className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-xs flex items-center justify-center gap-2 hover:glow-accent-sm transition-all min-h-[44px] touch-manipulation"
            >
              Start Building Custom PC
              <Icon name="ArrowRightIcon" size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Snap Dots */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollTo({
                  left: i * containerRef.current.clientWidth * 0.85,
                  behavior: 'smooth',
                });
              }
            }}
            className={`rounded-full transition-all duration-300 min-w-[8px] min-h-[8px] touch-manipulation ${
              activeIndex === i ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-border'
            }`}
            aria-label={`Go to tool card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

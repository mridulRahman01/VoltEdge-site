'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { FLASH_SALE_PRODUCTS } from '@/lib/mockData';
import { Skeleton } from '@/components/ui/Skeleton';

function useCountdown(targetMs: number) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, targetMs - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return timeLeft;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-elevated border border-border rounded-xl px-2.5 py-1.5 min-w-[44px] text-center">
        <span className="font-display font-bold text-xl sm:text-2xl text-accent tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium">{label}</span>
    </div>
  );
}

export default function FlashSaleStrip() {
  const [loading, setLoading] = useState(true);
  const [endTime] = useState(() => Date.now() + 4 * 3600000 + 27 * 60000 + 13000);
  const { h, m, s } = useCountdown(endTime);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="pulse-dot" />
                <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight">Flash Sale</h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Limited time. Maximum savings.</p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <TimeUnit value={h} label="HRS" />
              <span className="font-display font-bold text-xl sm:text-2xl text-accent mb-4">:</span>
              <TimeUnit value={m} label="MIN" />
              <span className="font-display font-bold text-xl sm:text-2xl text-accent mb-4">:</span>
              <TimeUnit value={s} label="SEC" />
            </div>
          </div>
          <Link
            href="/category"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 border border-accent/30 rounded-xl px-4 py-2.5 min-h-[44px] hover:bg-accent/10 transition-all shrink-0 touch-manipulation self-start sm:self-auto"
          >
            View All Deals →
          </Link>
        </div>

        {/* Horizontal scroll */}
        {loading ? (
          <div className="flex gap-3 sm:gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-[200px] sm:w-[240px] shrink-0">
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full rounded-none skeleton-shimmer" />
                  <div className="p-3 sm:p-4 space-y-3">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-9 w-full rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 snap-x-mandatory -mx-4 px-4">
            {FLASH_SALE_PRODUCTS.map((product) => (
              <div key={product.id} className="snap-start-item w-[200px] sm:w-[240px] shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
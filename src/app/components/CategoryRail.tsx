'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { Skeleton } from '@/components/ui/Skeleton';

const CATEGORIES = [
  { label: 'Laptop', icon: 'LaptopIcon', href: '/category', count: '128+' },
  { label: 'Desktop', icon: 'MonitorIcon', href: '/category', count: '64+' },
  { label: 'GPU', icon: 'CpuIcon', href: '/category', count: '45+' },
  { label: 'Monitor', icon: 'MonitorIcon', href: '/category', count: '72+' },
  { label: 'Phone', icon: 'SmartphoneIcon', href: '/category', count: '96+' },
  { label: 'Headphones', icon: 'HeadphonesIcon', href: '/category', count: '38+' },
  { label: 'Networking', icon: 'WifiIcon', href: '/category', count: '52+' },
  { label: 'Storage', icon: 'HardDriveIcon', href: '/category', count: '60+' },
  { label: 'Camera', icon: 'CameraIcon', href: '/category', count: '34+' },
  { label: 'Gaming', icon: 'GamepadIcon', href: '/category', count: '80+' },
  { label: 'Printer', icon: 'PrinterIcon', href: '/category', count: '28+' },
  { label: 'Appliances', icon: 'ZapIcon', href: '/category', count: '44+' },
];

export default function CategoryRail() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="py-6 sm:py-8 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-base sm:text-lg text-foreground">
            Shop by Category
          </h2>
          <Link
            href="/category"
            className="text-xs text-accent hover:text-accent/80 transition-colors min-h-[36px] flex items-center touch-manipulation"
          >
            View all →
          </Link>
        </div>
        {loading ? (
          <div className="flex gap-2 sm:gap-3 overflow-hidden">
            {Array.from({ length: 8 })?.map((_, i) => (
              <Skeleton
                key={i}
                className="h-20 w-20 sm:w-24 rounded-2xl shrink-0 skeleton-shimmer"
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 snap-x-mandatory">
            {CATEGORIES?.map((cat) => (
              <Link
                key={cat?.label}
                href={cat?.href}
                className="flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-2xl bg-surface border border-border hover:border-accent/40 hover:bg-elevated hover:shadow-[0_0_16px_var(--accent-dim)] transition-all group shrink-0 w-[76px] sm:w-[88px] min-h-[80px] snap-start-item touch-manipulation"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-elevated border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all">
                  <Icon name={cat?.icon} size={18} className="text-accent" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-foreground text-center leading-tight">
                  {cat?.label}
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground">
                  {cat?.count}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

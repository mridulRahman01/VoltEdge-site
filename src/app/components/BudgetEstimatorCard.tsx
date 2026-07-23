'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { formatPrice } from '@/lib/mockData';

export default function BudgetEstimatorCard() {
  const [budget, setBudget] = useState(95000);

  const getRecommendations = (b: number) => {
    if (b < 60000) {
      return { cpu: 'Core i3-12100F', gpu: 'GTX 1650 4GB', fps: '~140 FPS', tier: 'Budget 1080p' };
    }
    if (b < 100000) {
      return {
        cpu: 'Ryzen 5 5600',
        gpu: 'RTX 4060 8GB',
        fps: '~240 FPS',
        tier: 'Sweet Spot 1080p',
      };
    }
    if (b < 160000) {
      return {
        cpu: 'Core i5-13600K',
        gpu: 'RTX 4070 12GB',
        fps: '~360 FPS',
        tier: '1440p High FPS',
      };
    }
    return {
      cpu: 'Ryzen 7 7800X3D',
      gpu: 'RTX 4080 Super',
      fps: '~500 FPS+',
      tier: '4K Extreme Rig',
    };
  };

  const rec = getRecommendations(budget);

  return (
    <div className="bg-surface/95 border border-accent/40 rounded-3xl p-5 shadow-lg flex flex-col justify-between h-full space-y-3">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <Icon name="CpuIcon" size={16} />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-foreground">
                Quick PC Budget Estimator
              </h3>
              <span className="text-[10px] text-muted-foreground block">
                Slide to calculate your dream PC
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-accent/20 border border-accent/40 text-accent font-bold px-2 py-0.5 rounded-full shrink-0">
            {rec.tier}
          </span>
        </div>

        <div className="space-y-1.5 my-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-muted-foreground">Selected Budget:</span>
            <span className="font-display font-extrabold text-lg text-accent tabular-nums">
              {formatPrice(budget)}
            </span>
          </div>

          <div
            className="w-full py-1 touch-none"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <input
              type="range"
              min="40000"
              max="250000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer touch-none"
            />
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>৳40k</span>
            <span>৳150k Gaming</span>
            <span>৳250k Extreme</span>
          </div>
        </div>

        <div className="p-3 bg-elevated rounded-xl border border-border space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">CPU:</span>
            <span className="font-semibold text-foreground">{rec.cpu}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">GPU:</span>
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
        className="w-full py-2.5 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-xs flex items-center justify-center gap-1.5 hover:glow-accent-sm transition-all text-center min-h-[44px] touch-manipulation"
      >
        Build This PC Now
        <Icon name="ArrowRightIcon" size={14} />
      </Link>
    </div>
  );
}

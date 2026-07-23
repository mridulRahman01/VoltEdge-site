'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const BANKS = [
  { name: 'City Bank AMEX', rate: '0% EMI', sample: 5138 },
  { name: 'BRAC Bank', rate: '0% EMI', sample: 5250 },
  { name: 'EBL Mastercard', rate: '0% EMI', sample: 5180 },
];

export default function EmiPreviewCard() {
  const [selectedBank, setSelectedBank] = useState(BANKS[0]);

  return (
    <div className="bg-surface/95 border border-border rounded-3xl p-5 shadow-lg flex flex-col justify-between h-full space-y-3">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Icon name="CreditCardIcon" size={16} />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-foreground">0% EMI Preview</h3>
              <span className="text-[10px] text-muted-foreground block">
                3 to 36 Months on 30+ Banks
              </span>
            </div>
          </div>
          <Link
            href="/emi-calculator"
            className="text-xs text-accent hover:underline font-semibold shrink-0"
          >
            Calculate →
          </Link>
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2">
          {BANKS.map((b) => (
            <button
              key={b.name}
              onClick={() => setSelectedBank(b)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap touch-manipulation ${
                selectedBank.name === b.name
                  ? 'bg-accent/20 border border-accent/40 text-accent'
                  : 'bg-elevated border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        <div className="p-3 bg-elevated rounded-xl border border-border space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Sample 36 Months EMI:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              0% Interest
            </span>
          </div>
          <p className="font-display font-extrabold text-base text-foreground tabular-nums">
            From ৳ {selectedBank.sample.toLocaleString('en-BD')} / month
          </p>
        </div>
      </div>

      <Link
        href="/emi-calculator"
        className="w-full py-2.5 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-xs flex items-center justify-center gap-1.5 hover:border-accent/40 transition-all text-center min-h-[44px] touch-manipulation"
      >
        View Full EMI Bank List
        <Icon name="ArrowRightIcon" size={14} />
      </Link>
    </div>
  );
}

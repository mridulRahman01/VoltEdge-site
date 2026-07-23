'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const UTILITY_ITEMS = [
  {
    label: 'Hotline: 16793 / 09612-345678',
    icon: 'PhoneIcon',
    href: 'tel:16793',
    highlight: true,
  },
  {
    label: 'Warranty Check',
    icon: 'ShieldCheckIcon',
    href: '/warranty-check',
  },
  {
    label: 'Trade-In',
    icon: 'RefreshCwIcon',
    href: '/trade-in',
  },
  {
    label: 'Track Order',
    icon: 'TruckIcon',
    href: '/track-order',
  },
  {
    label: '0% EMI on 30+ Banks',
    icon: 'CalculatorIcon',
    href: '/emi-calculator',
    highlight: true,
  },
];

export default function MobileUtilityStrip() {
  return (
    <div className="lg:hidden bg-surface border-b border-border py-2 px-3 overflow-x-auto no-scrollbar touch-pan-x z-30 relative">
      <div className="flex items-center gap-3 w-max">
        {UTILITY_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors border ${
              item.highlight
                ? 'bg-accent/10 border-accent/30 text-accent font-semibold'
                : 'bg-elevated/60 border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon
              name={item.icon as 'PhoneIcon'}
              size={13}
              className={item.highlight ? 'text-accent' : 'text-muted-foreground'}
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

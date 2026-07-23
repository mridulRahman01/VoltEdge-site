'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const NAV_ITEMS = [
  { label: 'Home', icon: 'HomeIcon', href: '/' },
  { label: 'Categories', icon: 'GridIcon', href: '/category' },
  { label: 'PC Builder', icon: 'CpuIcon', href: '/pc-builder' },
  { label: 'Offers', icon: 'TagIcon', href: '/offers' },
  { label: 'Account', icon: 'UserIcon', href: '/sign-up-login' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-3 left-3 right-3 z-40 pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="bg-surface/90 backdrop-blur-lg border border-border rounded-full shadow-2xl px-1.5 py-1.5 flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[52px] min-h-[44px] px-2 py-1 rounded-full transition-all relative touch-manipulation ${
                isActive ? 'bg-accent/10' : 'active:bg-elevated'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                name={item.icon as 'HomeIcon'}
                size={20}
                className={isActive ? 'text-accent' : 'text-muted-foreground'}
              />
              <span
                className={`text-[10px] font-medium leading-none ${isActive ? 'text-accent' : 'text-muted-foreground'}`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

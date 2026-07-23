'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import CartCheckoutClient from '@/app/cart-checkout/components/CartCheckoutClient';
import { CartSkeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CartCheckoutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14 sm:pt-16 pb-24">
        <div className="border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 py-4 sm:py-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link
                href="/"
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Icon name="HomeIcon" size={14} />
                Home
              </Link>
              <Icon name="ChevronRightIcon" size={14} />
              <span className="text-foreground font-medium">Cart & Checkout</span>
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
              Your Cart
            </h1>
          </div>
        </div>
        {loading ? <CartSkeleton /> : <CartCheckoutClient />}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

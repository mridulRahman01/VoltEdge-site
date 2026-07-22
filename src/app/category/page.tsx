'use client';

import React, { useState, useEffect } from 'react';
import { ProductGridSkeleton, PageHeaderSkeleton } from '@/components/ui/Skeleton';
import CategoryFilters from '@/app/category/components/CategoryFilters';
import CategoryProductGrid from '@/app/category/components/CategoryProductGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CategoryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14 sm:pt-16 pb-24 lg:pb-0">
        {loading ? (
          <>
            <PageHeaderSkeleton />
            <div className="max-w-[1400px] mx-auto px-4 py-8">
              <div className="flex gap-8">
                <div className="hidden lg:block w-64 shrink-0 space-y-4">
                  {Array.from({ length: 5 })?.map((_, i) => (
                    <div key={i} className="h-32 bg-elevated rounded-2xl animate-pulse" />
                  ))}
                </div>
                <div className="flex-1">
                  <ProductGridSkeleton count={12} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Breadcrumb + Title */}
            <div className="border-b border-border">
              <div className="max-w-[1400px] mx-auto px-4 py-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                    <Icon name="HomeIcon" size={14} />
                    Home
                  </Link>
                  <Icon name="ChevronRightIcon" size={14} />
                  <span className="text-foreground font-medium">Laptops</span>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">Laptops</h1>
                  <span className="text-sm text-muted-foreground">128 products</span>
                </div>
              </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 py-8">
              <div className="flex gap-8">
                {/* Sidebar Filters */}
                <aside className="hidden lg:block w-64 shrink-0">
                  <CategoryFilters />
                </aside>
                {/* Product Grid */}
                <div className="flex-1 min-w-0">
                  <CategoryProductGrid />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
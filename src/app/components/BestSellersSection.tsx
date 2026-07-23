'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/mockData';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

const TABS = ['Best Sellers', 'New Arrivals', 'Top Rated'];

export default function BestSellersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleTabChange = (i: number) => {
    setLoading(true);
    setActiveTab(i);
    setTimeout(() => setLoading(false), 600);
  };

  const products =
    activeTab === 1
      ? PRODUCTS?.filter((p) => p?.isNew)?.concat(PRODUCTS?.slice(0, 4))
      : activeTab === 2
        ? [...PRODUCTS]?.sort((a, b) => b?.rating - a?.rating)?.slice(0, 4)
        : PRODUCTS?.slice(0, 4);

  return (
    <section className="py-10 sm:py-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-elevated border border-border rounded-xl overflow-x-auto no-scrollbar">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => handleTabChange(i)}
                className={`px-3 sm:px-4 py-2 min-h-[40px] rounded-lg text-xs sm:text-sm font-medium font-display transition-all whitespace-nowrap touch-manipulation ${
                  i === activeTab
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Link
            href="/category"
            className="text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1 min-h-[40px] touch-manipulation self-start sm:self-auto"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products?.slice(0, 4)?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

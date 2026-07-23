'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/mockData';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

export default function FeaturedGrid() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const featured = PRODUCTS?.filter((p) => p?.isFeatured)?.slice(0, 8);

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground tracking-tight mb-1">
              Featured Products
            </h2>
            <p className="text-sm text-muted-foreground">Hand-picked by our tech experts</p>
          </div>
          <Link
            href="/category"
            className="text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1 border border-accent/30 rounded-xl px-4 py-2.5 min-h-[44px] hover:bg-accent/10 touch-manipulation"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {featured?.map((product, index) => (
              // Only first 4 cards get priority (above fold on most screens)
              <ProductCard key={product?.id} product={product} priority={index < 4} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

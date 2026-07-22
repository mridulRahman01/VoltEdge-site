'use client';

import React, { useState } from 'react';

import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/AppIcon';
import { PRODUCTS, FLASH_SALE_PRODUCTS } from '@/lib/mockData';

const SORT_OPTIONS = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest'];

export default function CategoryProductGrid() {
  const [sort, setSort] = useState('Relevance');
  const [filterOpen, setFilterOpen] = useState(false);
  const allProducts = [...PRODUCTS, ...FLASH_SALE_PRODUCTS];

  return (
    <div>
      {/* Sort bar */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm text-muted-foreground">Sort by:</span>
          <div className="flex gap-1.5 flex-wrap">
            {SORT_OPTIONS?.map((opt) => (
              <button
                key={opt}
                onClick={() => setSort(opt)}
                className={`px-2.5 sm:px-3 py-2 min-h-[40px] rounded-xl text-xs font-medium transition-all touch-manipulation ${
                  sort === opt
                    ? 'bg-accent/10 border border-accent/30 text-accent' :'bg-elevated border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile filter button */}
        <button
          className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2.5 min-h-[44px] rounded-xl bg-elevated border border-border text-sm text-foreground touch-manipulation shrink-0"
          onClick={() => setFilterOpen(!filterOpen)}
          aria-expanded={filterOpen}
          aria-label="Toggle filters"
        >
          <Icon name="SlidersHorizontalIcon" size={16} />
          <span className="hidden xs:inline">Filters</span>
        </button>
      </div>
      {/* Active filter chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['ASUS', '16GB RAM', '৳1L–৳2L']?.map((chip) => (
          <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-medium">
            {chip}
            <button className="hover:text-danger transition-colors p-0.5 touch-manipulation" aria-label={`Remove ${chip} filter`}>
              <Icon name="XIcon" size={12} />
            </button>
          </span>
        ))}
      </div>
      {/* Grid — 2 cols on mobile, 3 on md+ */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {allProducts?.slice(0, 12)?.map((product, index) => (
          // First 6 products are likely above fold on mobile — give them priority
          (<ProductCard key={product?.id} product={product} priority={index < 6} />)
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8 sm:mt-10">
        <button className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-elevated border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center touch-manipulation">
          <Icon name="ChevronLeftIcon" size={18} />
        </button>
        {[1, 2, 3, 4, 5]?.map((page) => (
          <button
            key={page}
            className={`w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl text-sm font-medium font-display transition-all touch-manipulation ${
              page === 1
                ? 'bg-accent text-accent-foreground'
                : 'bg-elevated border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-elevated border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center touch-manipulation">
          <Icon name="ChevronRightIcon" size={18} />
        </button>
      </div>
    </div>
  );
}
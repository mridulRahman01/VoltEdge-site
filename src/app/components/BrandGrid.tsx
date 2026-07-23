'use client';

import React from 'react';
import Link from 'next/link';

const BRANDS = [
  { name: 'ASUS', category: 'Laptops & GPUs', count: '140+ Products' },
  { name: 'MSI', category: 'Gaming & Motherboards', count: '95+ Products' },
  { name: 'Gigabyte', category: 'AORUS Gaming', count: '110+ Products' },
  { name: 'Corsair', category: 'RAM & Power Supplies', count: '80+ Products' },
  { name: 'AMD', category: 'Ryzen CPUs & Radeon', count: '65+ Products' },
  { name: 'Intel', category: 'Core Processors', count: '70+ Products' },
  { name: 'NVIDIA', category: 'GeForce RTX GPUs', count: '85+ Products' },
  { name: 'Samsung', category: 'Monitors & NVMe SSDs', count: '120+ Products' },
];

export default function BrandGrid() {
  return (
    <section className="py-8 sm:py-10 border-y border-border/50 bg-elevated/30">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">
              Top Authorized Brands
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Official warranty guaranteed on all major brands
            </p>
          </div>
          <Link href="/category" className="text-xs font-semibold text-accent hover:underline">
            All Brands →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href="/category"
              className="bg-card border border-border hover:border-accent/50 rounded-xl p-3 text-center transition-all hover:-translate-y-0.5 group shadow-sm flex flex-col justify-center items-center"
            >
              <span className="font-display font-extrabold text-base sm:text-lg text-foreground group-hover:text-accent transition-colors">
                {brand.name}
              </span>
              <span className="text-[10px] text-muted-foreground truncate w-full mt-0.5">
                {brand.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

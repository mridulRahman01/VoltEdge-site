'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import ProductGallery from '@/app/product-detail/components/ProductGallery';
import ProductInfo from '@/app/product-detail/components/ProductInfo';
import ProductSpecs from '@/app/product-detail/components/ProductSpecs';
import ProductReviews from '@/app/product-detail/components/ProductReviews';
import RelatedProducts from '@/app/product-detail/components/RelatedProducts';
import { ProductDetailSkeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ProductDetailPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14 sm:pt-16 pb-24">
        {loading ? (
          <ProductDetailSkeleton />
        ) : (
          <>
            {/* Breadcrumb */}
            <div className="border-b border-border">
              <div className="max-w-[1400px] mx-auto px-4 py-3 sm:py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                  <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                    <Icon name="HomeIcon" size={14} />
                    Home
                  </Link>
                  <Icon name="ChevronRightIcon" size={14} />
                  <Link href="/category" className="hover:text-foreground transition-colors">Laptops</Link>
                  <Icon name="ChevronRightIcon" size={14} />
                  <span className="text-foreground font-medium line-clamp-1">ASUS ROG Strix G16 Gaming Laptop</span>
                </div>
              </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 py-8">
              <div className="grid lg:grid-cols-2 gap-10 mb-16">
                <ProductGallery />
                <ProductInfo />
              </div>
              <ProductSpecs />
              <ProductReviews />
              <RelatedProducts />
            </div>
          </>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
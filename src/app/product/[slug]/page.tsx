import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import ProductGallery from '@/app/product-detail/components/ProductGallery';
import ProductInfo from '@/app/product-detail/components/ProductInfo';
import ProductSpecs from '@/app/product-detail/components/ProductSpecs';
import ProductReviews from '@/app/product-detail/components/ProductReviews';
import RelatedProducts from '@/app/product-detail/components/RelatedProducts';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { api } from '@/lib/api';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await api.getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found | VoltEdge' };
  return {
    title: `${product.name} — Buy at Best Price in BD | VoltEdge`,
    description: `${product.name} with ${Array.isArray(product.specs) ? product.specs.join(', ') : 'official warranty'} available now at VoltEdge Bangladesh.`,
  };
}

export default async function DynamicProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await api.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14 sm:pt-16 pb-24">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Link
                href="/"
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Icon name="HomeIcon" size={14} />
                Home
              </Link>
              <Icon name="ChevronRightIcon" size={14} />
              <Link href="/category" className="hover:text-foreground transition-colors capitalize">
                {product.category || 'Components'}
              </Link>
              <Icon name="ChevronRightIcon" size={14} />
              <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
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
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

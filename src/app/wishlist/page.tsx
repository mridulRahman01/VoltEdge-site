'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { PRODUCTS, formatPrice, formatEmi } from '@/lib/mockData';
import { useToast } from '@/context/ToastContext';

// Initial wishlisted items mock
const INITIAL_WISHLIST = [
  PRODUCTS[0], // ASUS ROG Strix G16
  PRODUCTS[1], // MSI RTX 4070
  PRODUCTS[3], // Samsung Odyssey G7
];

export default function WishlistPage() {
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  const handleRemove = (id: string, name: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.info(`Removed "${name}" from wishlist.`);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlist([]);
      toast.warning('Your wishlist has been cleared.');
    }
  };

  const handleAddToCart = (item: (typeof PRODUCTS)[0]) => {
    toast.success(`Moved "${item.name}" to cart successfully! 🛒`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 sm:pt-24 pb-20 max-w-[1400px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">My Wishlist</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-center text-danger">
              <Icon name="HeartIcon" size={22} />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                My Saved Wishlist
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''} in your wishlist
              </p>
            </div>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2.5 rounded-xl bg-danger/10 border border-danger/30 text-danger font-display font-semibold text-xs flex items-center gap-1.5 hover:bg-danger/20 transition-all self-start sm:self-auto"
            >
              <Icon name="Trash2Icon" size={14} />
              Clear Wishlist
            </button>
          )}
        </div>

        {/* Wishlist Items Grid */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-surface border border-border rounded-3xl p-5 shadow-sm flex flex-col justify-between hover:border-accent/30 transition-all relative group"
              >
                {/* Remove Heart Button */}
                <button
                  onClick={() => handleRemove(product.id, product.name)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-elevated/80 border border-border text-danger hover:bg-danger/20 transition-colors z-10"
                  title="Remove from Wishlist"
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <Icon name="XIcon" size={16} />
                </button>

                {/* Product Image & Info */}
                <div>
                  <div className="w-full h-48 rounded-2xl overflow-hidden bg-elevated mb-4 relative">
                    <AppImage
                      src={product.image}
                      alt={product.alt}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                      In Stock
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">
                    {product.brand}
                  </span>
                  <Link
                    href="/product-detail"
                    className="font-display font-bold text-base text-foreground line-clamp-2 hover:text-accent transition-colors mb-2"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display font-bold text-lg text-accent tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through tabular-nums">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{formatEmi(product.price)}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full h-10 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-xs flex items-center justify-center gap-1.5 hover:glow-accent-sm transition-all"
                  >
                    <Icon name="ShoppingCartIcon" size={14} />
                    Move to Cart
                  </button>
                  <Link
                    href="/product-detail"
                    className="w-full h-10 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-xs flex items-center justify-center hover:border-accent/40 transition-all text-center leading-none"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-surface border border-border rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-md">
            <div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto">
              <Icon name="HeartIcon" size={32} />
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You haven&apos;t saved any tech items to your wishlist yet. Explore our catalog and
              click the heart icon on any product to save it for later!
            </p>
            <Link
              href="/category"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all"
            >
              Browse All Products
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </div>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

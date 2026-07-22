'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Product, formatPrice, formatEmi } from '@/lib/mockData';
import { useToast } from '@/context/ToastContext';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({ product, className = '', priority = false }: ProductCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !wishlisted;
    setWishlisted(next);
    if (next) {
      toast.success(`Added "${product.name}" to your wishlist! ❤️`);
    } else {
      toast.info(`Removed "${product.name}" from wishlist.`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    toast.success(`Added "${product.name}" to cart successfully! 🛒`);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`Proceeding to checkout with "${product.name}" 🚀`);
    router.push('/cart-checkout');
  };

  return (
    <Link href="/product-detail" className={`group block bg-card border border-border rounded-2xl overflow-hidden card-hover relative ${className}`}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          In Stock
        </span>
        {product.discount && (
          <span className="px-2 py-0.5 rounded-full bg-danger text-white text-xs font-bold font-display">
            -{product.discount}%
          </span>
        )}
        {product.badge === 'Price Drop' && (
          <span className="px-2 py-0.5 rounded-full bg-elevated border border-accent/40 text-accent text-xs font-medium flex items-center gap-1">
            <span className="pulse-dot" />
            Price Drop
          </span>
        )}
        {product.badge === 'Low Stock' && (
          <span className="px-2 py-0.5 rounded-full bg-warning/20 border border-warning/40 text-warning text-xs font-medium">
            Low Stock
          </span>
        )}
      </div>

      {/* Action buttons (Wishlist & Quick View) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity">
        <button
          onClick={handleWishlist}
          className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg bg-elevated/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-danger transition-colors shadow-md"
          aria-label="Add to wishlist"
        >
          <Icon name="HeartIcon" size={16} className={wishlisted ? 'text-danger fill-danger' : ''} />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="p-2 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg bg-elevated/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-accent transition-colors shadow-md"
          title="Quick View"
        >
          <Icon name="EyeIcon" size={16} />
        </button>
      </div>

      {/* Image */}
      <div className="relative bg-elevated aspect-[4/3] overflow-hidden">
        <AppImage
          src={product.image}
          alt={product.alt}
          fill
          priority={priority}
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between gap-1 mb-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground font-medium">3 Yrs Warranty</span>
        </div>
        <h3 className="font-display font-semibold text-sm text-foreground line-clamp-2 mb-2 leading-snug">{product.name}</h3>

        {/* Spec chips */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.specs.slice(0, 2).map((spec) => (
            <span key={spec} className="px-1.5 py-0.5 rounded-md bg-elevated border border-border text-xs text-muted-foreground">{spec}</span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex">
            {[1,2,3,4,5].map((star) => (
              <Icon key={star} name="StarIcon" size={12} className={star <= Math.round(product.rating) ? 'text-warning' : 'text-border'} variant="solid" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-display font-bold text-base sm:text-lg text-accent tabular-nums">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
        {product.emi && (
          <p className="text-xs text-muted-foreground mb-3">{formatEmi(product.price)}</p>
        )}

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="grid grid-cols-2 gap-1.5 pt-2 items-center">
          <button
            onClick={handleAddToCart}
            className={`w-full h-9 rounded-xl text-[10px] sm:text-xs font-semibold font-display transition-all flex items-center justify-center text-center px-1 leading-none ${
              addedToCart
                ? 'bg-accent/20 text-accent border border-accent/40' :'bg-elevated border border-border text-foreground hover:bg-elevated/80'
            }`}
          >
            <span className="truncate">{addedToCart ? '✓ Added' : 'Add to Cart'}</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full h-9 rounded-xl text-[10px] sm:text-xs font-semibold font-display bg-accent text-accent-foreground hover:glow-accent-sm flex items-center justify-center text-center px-1 leading-none"
          >
            <span className="truncate">Buy Now</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
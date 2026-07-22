'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Product, formatPrice, formatEmi } from '@/lib/mockData';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({ product, className = '', priority = false }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <Link href="/product-detail" className={`group block bg-card border border-border rounded-2xl overflow-hidden card-hover relative ${className}`}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
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
        {product.isNew && (
          <span className="px-2 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-medium">
            New
          </span>
        )}
      </div>

      {/* Wishlist — always visible on mobile for touch, hover on desktop */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted(!wishlisted); }}
        className="absolute top-3 right-3 z-10 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-elevated/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-danger transition-colors sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
        aria-label="Add to wishlist"
      >
        <Icon name={wishlisted ? 'HeartIcon' : 'HeartIcon'} size={16} className={wishlisted ? 'text-danger' : ''} />
      </button>

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
        <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">{product.brand}</p>
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

        {/* Quick actions — always visible on mobile, hover on desktop */}
        <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold font-display transition-all ${
              addedToCart
                ? 'bg-accent/20 text-accent border border-accent/40' :'bg-accent text-accent-foreground hover:glow-accent-sm'
            }`}
          >
            {addedToCart ? '✓ Added' : 'Add to Cart'}
          </button>
          <button className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-elevated border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center" aria-label="Compare">
            <Icon name="GitCompareIcon" size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}
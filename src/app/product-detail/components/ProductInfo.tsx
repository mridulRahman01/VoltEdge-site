'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { formatPrice, formatEmi } from '@/lib/mockData';
import { useToast } from '@/context/ToastContext';

const PRODUCT = {
  name: 'ASUS ROG Strix G16 Gaming Laptop',
  brand: 'ASUS',
  sku: 'ROG-G16-I9-RTX4070',
  price: 185000,
  oldPrice: 210000,
  discount: 12,
  rating: 4.8,
  reviews: 124,
  stock: 8,
  specs: ['Intel i9-14900HX', 'RTX 4070 8GB', '16GB DDR5', '1TB NVMe SSD', '16" QHD 240Hz'],
  warranty: '2 Years ASUS Service Center',
};

export default function ProductInfo() {
  const { toast } = useToast();
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [emiMonths, setEmiMonths] = useState(12);

  const handleAddToCart = () => {
    setAddedToCart(true);
    toast.success(`Added ${qty}x "${PRODUCT.name}" to cart successfully! 🛒`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Brand + badges */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="px-3 py-1 rounded-full bg-elevated border border-border text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          {PRODUCT?.brand}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-danger/20 border border-danger/30 text-danger text-xs font-bold">
          -{PRODUCT?.discount}%
        </span>
        <span className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium flex items-center gap-1">
          <span className="pulse-dot" />
          In Stock ({PRODUCT?.stock} left)
        </span>
      </div>
      {/* Name */}
      <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight leading-tight">
        {PRODUCT?.name}
      </h1>
      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5]?.map((star) => (
            <Icon
              key={star}
              name="StarIcon"
              size={16}
              className={star <= Math.round(PRODUCT?.rating) ? 'text-warning' : 'text-border'}
              variant="solid"
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">{PRODUCT?.rating}</span>
        <span className="text-sm text-muted-foreground">({PRODUCT?.reviews} reviews)</span>
        <Link
          href="#reviews"
          className="text-sm text-accent hover:text-accent/80 transition-colors"
        >
          Write a review
        </Link>
      </div>
      {/* Spec chips */}
      <div className="flex flex-wrap gap-2">
        {PRODUCT?.specs?.map((spec) => (
          <span
            key={spec}
            className="px-3 py-1.5 rounded-xl bg-elevated border border-border text-xs font-medium text-muted-foreground"
          >
            {spec}
          </span>
        ))}
      </div>
      {/* Price */}
      <div className="p-5 bg-surface border border-border rounded-2xl space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="font-display font-bold text-3xl text-accent tabular-nums">
            {formatPrice(PRODUCT?.price)}
          </span>
          <span className="text-lg text-muted-foreground line-through tabular-nums">
            {formatPrice(PRODUCT?.oldPrice)}
          </span>
          <span className="text-sm font-medium text-danger">
            Save {formatPrice(PRODUCT?.oldPrice - PRODUCT?.price)}
          </span>
        </div>
        {/* EMI */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-muted-foreground">EMI:</span>
          {[3, 6, 12, 24]?.map((m) => (
            <button
              key={m}
              onClick={() => setEmiMonths(m)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                emiMonths === m
                  ? 'bg-accent/10 border border-accent/30 text-accent'
                  : 'bg-elevated border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {m}mo
            </button>
          ))}
          <span className="text-sm font-display font-semibold text-accent">
            {formatEmi(PRODUCT?.price, emiMonths)}
          </span>
        </div>
      </div>
      {/* Qty + Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-0 bg-elevated border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
            aria-label="Decrease quantity"
          >
            <Icon name="MinusIcon" size={16} />
          </button>
          <span className="px-4 py-3 font-display font-semibold text-foreground min-w-[50px] text-center tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
            aria-label="Increase quantity"
          >
            <Icon name="PlusIcon" size={16} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className={`flex-1 min-w-[140px] h-12 flex items-center justify-center gap-2 px-4 rounded-xl font-display font-semibold text-xs sm:text-sm transition-all leading-none ${
            addedToCart
              ? 'bg-accent/20 text-accent border border-accent/40'
              : 'bg-accent text-accent-foreground hover:glow-accent-sm'
          }`}
        >
          <Icon name={addedToCart ? 'CheckIcon' : 'ShoppingCartIcon'} size={18} />
          <span className="truncate">{addedToCart ? 'Added to Cart!' : 'Add to Cart'}</span>
        </button>

        <button
          onClick={() => {
            const next = !wishlisted;
            setWishlisted(next);
            if (next) toast.success(`Added "${PRODUCT.name}" to wishlist! ❤️`);
            else toast.info(`Removed "${PRODUCT.name}" from wishlist.`);
          }}
          className={`p-3.5 rounded-xl border transition-all ${
            wishlisted
              ? 'bg-danger/10 border-danger/30 text-danger'
              : 'bg-elevated border-border text-muted-foreground hover:text-danger hover:border-danger/30'
          }`}
          aria-label="Add to wishlist"
        >
          <Icon name="HeartIcon" size={20} />
        </button>

        <button
          className="p-3.5 rounded-xl bg-elevated border border-border text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Compare"
        >
          <Icon name="GitCompareIcon" size={20} />
        </button>
      </div>
      {/* Warranty + SKU + Stock Locations */}
      <div className="space-y-2.5 text-sm p-4 bg-elevated/40 border border-border rounded-xl">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="ShieldCheckIcon" size={16} className="text-accent shrink-0" />
          <span>{PRODUCT?.warranty}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="MapPinIcon" size={16} className="text-accent shrink-0" />
          <span className="font-medium text-foreground">In-Store Stock Status:</span>
          <select className="bg-surface border border-border text-foreground text-xs rounded-lg px-2 py-1 outline-none">
            <option>Dhaka - IDB Bhaban Branch (In Stock)</option>
            <option>Dhaka - Multiplan Center (In Stock)</option>
            <option>Dhaka - Uttara Branch (Low Stock)</option>
            <option>Chittagong - Agrabad Branch (In Stock)</option>
          </select>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="TruckIcon" size={16} className="text-accent shrink-0" />
          <span>Fast Home Delivery within 24-48 Hours across Bangladesh</span>
        </div>
      </div>
    </div>
  );
}

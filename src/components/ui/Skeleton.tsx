'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <div
      className={`rounded-lg animate-shimmer ${className}`}
      style={{
        background: 'linear-gradient(90deg, #1A1A1E 25%, #121214 50%, #1A1A1E 75%)',
        backgroundSize: '200% 100%',
        ...style,
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-3 w-3 rounded-sm" />
          ))}
        </div>
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[92vh] flex items-center bg-background">
      <div className="max-w-[1400px] mx-auto px-4 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Skeleton className="h-8 w-40 rounded-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-4/5" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-36 rounded-xl" />
              <Skeleton className="h-12 w-36 rounded-xl" />
            </div>
          </div>
          <Skeleton className="aspect-square rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export function CategoryRailSkeleton() {
  return (
    <div className="py-8 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-24 rounded-2xl shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 py-5">
        <Skeleton className="h-4 w-32 mb-2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-7 w-20 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-3">
            <Skeleton className="h-14 flex-1 rounded-xl" />
            <Skeleton className="h-14 w-14 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PCBuilderSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-14 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-4 bg-surface border border-border rounded-2xl">
              <Skeleton className="w-24 h-24 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-28 rounded-xl" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-14 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

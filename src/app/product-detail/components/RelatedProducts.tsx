import React from 'react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/mockData';

export default function RelatedProducts() {
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-foreground mb-6 tracking-tight">
        Related Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PRODUCTS?.slice(0, 4)?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
}

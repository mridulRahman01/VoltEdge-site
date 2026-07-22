'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const IMAGES = [
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_16ac65cc9-1769167060872.png", alt: 'ASUS ROG Strix G16 front view, black gaming laptop with illuminated keyboard, dark background' },
{ src: "https://images.unsplash.com/photo-1593280593039-1d1b01e23826", alt: 'Laptop open showing display and keyboard from above, dark studio lighting' },
{ src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f2c1a87c-1769411710194.png", alt: 'Laptop side profile showing ports and slim chassis, dark background' },
{ src: "https://images.unsplash.com/photo-1603049965603-3365e6c9a149", alt: 'Laptop keyboard closeup with RGB backlighting, dark moody lighting' }];


export default function ProductGallery() {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-[4/3] bg-elevated border border-border rounded-2xl overflow-hidden">
        <AppImage
          src={IMAGES?.[active]?.src}
          alt={IMAGES?.[active]?.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover" />
        
        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-surface/80 backdrop-blur-sm border border-border rounded-full text-xs text-muted-foreground">
          Hover to zoom
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-3">
        {IMAGES?.map((img, i) =>
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
          i === active ? 'border-accent' : 'border-border hover:border-accent/40'}`
          }
          aria-label={`View image ${i + 1}`}>
          
            <AppImage src={img?.src} alt={img?.alt} fill sizes="80px" className="object-cover" />
          </button>
        )}
      </div>
    </div>);

}
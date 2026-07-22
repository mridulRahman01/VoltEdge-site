import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    { url: base, priority: 1.0, changeFrequency: 'daily' },
    { url: `${base}/category`, priority: 0.8, changeFrequency: 'daily' },
    { url: `${base}/product-detail`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${base}/pc-builder`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${base}/cart-checkout`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${base}/sign-up-login`, priority: 0.3, changeFrequency: 'monthly' },
  ];
}
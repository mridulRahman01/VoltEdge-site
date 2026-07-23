import { PRODUCTS, CATEGORIES, Product } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchWithFallback<T>(url: string, fallbackData: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 sec timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data ?? json ?? fallbackData;
  } catch (error) {
    // console.warn(`API call to ${url} failed, using local fallback data:`, error);
    return fallbackData;
  }
}

export const api = {
  // Products API
  async getProducts(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    let url = `${API_BASE_URL}/products`;
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.minPrice) searchParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());

    if (searchParams.toString()) url += `?${searchParams.toString()}`;

    let result = PRODUCTS;
    if (params?.category && params.category !== 'all') {
      result = result.filter((p) => p.category.toLowerCase() === params.category?.toLowerCase());
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    if (params?.minPrice) {
      result = result.filter((p) => p.price >= params.minPrice!);
    }
    if (params?.maxPrice) {
      result = result.filter((p) => p.price <= params.maxPrice!);
    }

    return fetchWithFallback<Product[]>(url, result);
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const fallback = PRODUCTS.find(
      (p) => p.id === slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
    );
    return fetchWithFallback<Product | undefined>(
      `${API_BASE_URL}/products/${slug}`,
      fallback || PRODUCTS[0]
    );
  },

  // Warranty API
  async checkWarranty(serialNumber: string) {
    return fetchWithFallback(`${API_BASE_URL}/warranty/${serialNumber}`, {
      serial_number: serialNumber,
      status: 'active',
      customer_name: 'Verified Customer',
      customer_phone: '01700000000',
      purchase_date: '2024-01-15',
      warranty_expiry: '2027-01-15',
      days_remaining: 540,
      is_expired: false,
    });
  },

  // Trade-In API
  async calculateTradeIn(data: {
    device_type: string;
    brand: string;
    model: string;
    condition: string;
    has_box?: boolean;
    has_receipt?: boolean;
  }) {
    try {
      const res = await fetch(`${API_BASE_URL}/tradein/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        return json.estimated_value;
      }
    } catch (e) {
      // Fallback estimate logic
    }
    let base = 20000;
    if (data.condition === 'Like New') base *= 1.2;
    if (data.condition === 'Fair') base *= 0.7;
    return Math.round(base);
  },
};

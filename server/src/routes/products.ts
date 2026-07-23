import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../lib/supabase';
import { validateBody } from '../middleware/validator';

const router = Router();

const productSchema = z.object({
  title: z.string().min(2, 'Product title must be at least 2 characters'),
  slug: z.string().min(2),
  sku: z.string().optional(),
  price: z.number().positive(),
  original_price: z.number().optional(),
  discount: z.number().min(0).max(100).optional(),
  stock: z.number().int().min(0),
  category_id: z.string().uuid().optional(),
  brand: z.string().min(1),
  model: z.string().optional(),
  specs: z.record(z.any()).default({}),
  images: z.array(z.string().url()).default([]),
  is_featured: z.boolean().default(false),
  is_hot: z.boolean().default(false),
  warranty_months: z.number().int().default(12),
});

// GET /api/products
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, brand, search, minPrice, maxPrice, limit = '20', page = '1' } = req.query;

    let query = supabaseAdmin.from('products').select('*', { count: 'exact' });

    if (category) {
      query = query.eq('category_id', category as string);
    }
    if (brand) {
      query = query.eq('brand', brand as string);
    }
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
    if (minPrice) {
      query = query.gte('price', Number(minPrice));
    }
    if (maxPrice) {
      query = query.lte('price', Number(maxPrice));
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    query = query.range(offset, offset + limitNum - 1).order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data: data || [],
      pagination: {
        total: count || 0,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// POST /api/products (Admin)
router.post('/', validateBody(productSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await supabaseAdmin.from('products').insert([req.body]).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;

import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../lib/supabase';
import { validateBody } from '../middleware/validator';

const router = Router();

const addToCartSchema = z.object({
  user_id: z.string().uuid().optional(),
  session_id: z.string().optional(),
  product_id: z.string().uuid(),
  quantity: z.number().int().min(1).default(1),
});

const updateCartSchema = z.object({
  cart_id: z.string().uuid(),
  quantity: z.number().int().min(1),
});

// GET /api/cart
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, session_id } = req.query;

    if (!user_id && !session_id) {
      res.status(400).json({ success: false, error: 'Either user_id or session_id is required' });
      return;
    }

    let query = supabaseAdmin.from('cart_items').select('*, product:products(*)');

    if (user_id) {
      query = query.eq('user_id', user_id as string);
    } else {
      query = query.eq('session_id', session_id as string);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json({ success: true, data: data || [] });
  } catch (error) {
    next(error);
  }
});

// POST /api/cart/add
router.post('/add', validateBody(addToCartSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, session_id, product_id, quantity } = req.body;

    if (!user_id && !session_id) {
      res.status(400).json({ success: false, error: 'Either user_id or session_id must be provided' });
      return;
    }

    // Check existing item
    let checkQuery = supabaseAdmin.from('cart_items').select('*').eq('product_id', product_id);
    if (user_id) checkQuery = checkQuery.eq('user_id', user_id);
    else checkQuery = checkQuery.eq('session_id', session_id);

    const { data: existing } = await checkQuery.single();

    if (existing) {
      const updatedQty = existing.quantity + quantity;
      const { data, error } = await supabaseAdmin
        .from('cart_items')
        .update({ quantity: updatedQty, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      res.json({ success: true, data, message: 'Cart item updated' });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('cart_items')
      .insert([{ user_id, session_id, product_id, quantity }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// PUT /api/cart/update
router.put('/update', validateBody(updateCartSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cart_id, quantity } = req.body;
    const { data, error } = await supabaseAdmin
      .from('cart_items')
      .update({ quantity, updated_at: new Date().toISOString() })
      .eq('id', cart_id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/remove
router.delete('/remove/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin.from('cart_items').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
});

// POST /api/cart/merge (Guest -> Authenticated User merge)
router.post('/merge', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { session_id, user_id } = req.body;
    if (!session_id || !user_id) {
      res.status(400).json({ success: false, error: 'session_id and user_id are required for cart merge' });
      return;
    }

    // Reassign guest cart items to user_id
    const { error } = await supabaseAdmin
      .from('cart_items')
      .update({ user_id, session_id: null })
      .eq('session_id', session_id);

    if (error) throw error;
    res.json({ success: true, message: 'Cart items merged successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;

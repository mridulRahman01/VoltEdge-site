import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../lib/supabase';
import { validateBody } from '../middleware/validator';

const router = Router();

const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  product_title: z.string(),
  unit_price: z.number().positive(),
  quantity: z.number().int().min(1),
  total_price: z.number().positive(),
});

const createOrderSchema = z.object({
  user_id: z.string().uuid().optional(),
  guest_email: z.string().email().optional(),
  guest_phone: z.string().optional(),
  shipping_address: z.object({
    full_name: z.string().min(2),
    phone: z.string().min(10),
    address: z.string().min(5),
    city: z.string().min(2),
    district: z.string().optional(),
  }),
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
  total_amount: z.number().positive(),
  shipping_fee: z.number().min(0).default(0),
  payment_method: z.string().min(2),
});

// POST /api/orders
router.post('/', validateBody(createOrderSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, guest_email, guest_phone, shipping_address, items, total_amount, shipping_fee, payment_method } =
      req.body;

    const orderNumber = `VE-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          order_number: orderNumber,
          user_id: user_id || null,
          guest_email: guest_email || null,
          guest_phone: guest_phone || null,
          shipping_address,
          total_amount,
          shipping_fee,
          payment_method,
          payment_status: 'pending',
          order_status: 'processing',
        },
      ])
      .select()
      .single();

    if (orderError || !orderData) throw orderError;

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: orderData.id,
      product_id: item.product_id,
      product_title: item.product_title,
      unit_price: item.unit_price,
      quantity: item.quantity,
      total_price: item.total_price,
    }));

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItems);
    if (itemsError) throw itemsError;

    res.status(201).json({
      success: true,
      data: {
        ...orderData,
        items: orderItems,
      },
      message: 'Order created successfully',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:order_number
router.get('/:order_number', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order_number } = req.params;
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('order_number', order_number)
      .single();

    if (error || !data) {
      res.status(404).json({ success: false, error: 'Order not found' });
      return;
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;

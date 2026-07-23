import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../lib/supabase';
import { validateBody } from '../middleware/validator';

const router = Router();

const estimateSchema = z.object({
  device_type: z.enum(['GPU', 'CPU', 'Laptop', 'Console', 'Other']),
  brand: z.string().min(1),
  model: z.string().min(1),
  condition: z.enum(['Like New', 'Good', 'Fair', 'For Parts']),
  has_box: z.boolean().default(false),
  has_receipt: z.boolean().default(false),
});

const submitTradeInSchema = estimateSchema.extend({
  user_id: z.string().uuid().optional(),
  contact_name: z.string().min(2),
  contact_phone: z.string().min(10),
  estimated_value: z.number().positive(),
});

function calculateTradeInEstimate(body: z.infer<typeof estimateSchema>): number {
  let baseValue = 15000;

  if (body.device_type === 'GPU') baseValue = 25000;
  if (body.device_type === 'Laptop') baseValue = 35000;
  if (body.device_type === 'CPU') baseValue = 12000;

  let conditionMultiplier = 0.8;
  if (body.condition === 'Like New') conditionMultiplier = 1.0;
  if (body.condition === 'Good') conditionMultiplier = 0.85;
  if (body.condition === 'Fair') conditionMultiplier = 0.65;
  if (body.condition === 'For Parts') conditionMultiplier = 0.3;

  let total = baseValue * conditionMultiplier;
  if (body.has_box) total += 1000;
  if (body.has_receipt) total += 1500;

  return Math.round(total / 100) * 100;
}

// POST /api/tradein/estimate
router.post('/estimate', validateBody(estimateSchema), (req: Request, res: Response) => {
  const estimated_value = calculateTradeInEstimate(req.body);
  res.json({ success: true, estimated_value, currency: 'BDT' });
});

// POST /api/tradein/submit
router.post('/submit', validateBody(submitTradeInSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, contact_name, contact_phone, device_type, brand, model, condition, has_box, has_receipt, estimated_value } = req.body;
    const request_number = `TI-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const { data, error } = await supabaseAdmin
      .from('trade_in_requests')
      .insert([
        {
          request_number,
          user_id: user_id || null,
          contact_name,
          contact_phone,
          device_type,
          device_details: { brand, model, condition, has_box, has_receipt },
          estimated_value,
          status: 'submitted',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data, message: 'Trade-in request submitted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;

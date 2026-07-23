import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../lib/supabase';
import { validateBody } from '../middleware/validator';

const router = Router();

const claimSchema = z.object({
  serial_number: z.string().min(3),
  customer_name: z.string().min(2),
  customer_phone: z.string().min(10),
  issue_description: z.string().min(10),
});

// GET /api/warranty/:serial_number
router.get('/:serial_number', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serial_number } = req.params;
    const { data, error } = await supabaseAdmin
      .from('serials_warranties')
      .select('*, product:products(*)')
      .eq('serial_number', serial_number.trim().toUpperCase())
      .single();

    if (error || !data) {
      res.status(404).json({ success: false, error: 'Serial number not found or invalid' });
      return;
    }

    const today = new Date();
    const expiry = new Date(data.warranty_expiry);
    const isExpired = today > expiry;

    res.json({
      success: true,
      data: {
        ...data,
        is_expired: isExpired,
        days_remaining: isExpired ? 0 : Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24)),
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/warranty/claim
router.post('/claim', validateBody(claimSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serial_number, issue_description } = req.body;

    const { data: record, error: fetchErr } = await supabaseAdmin
      .from('serials_warranties')
      .select('*')
      .eq('serial_number', serial_number.toUpperCase())
      .single();

    if (fetchErr || !record) {
      res.status(404).json({ success: false, error: 'Serial number not found' });
      return;
    }

    const existingClaims = Array.isArray(record.claims_history) ? record.claims_history : [];
    const newClaim = {
      claim_id: `CLAIM-${Date.now()}`,
      date: new Date().toISOString(),
      issue: issue_description,
      status: 'under_review',
    };

    const updatedClaims = [...existingClaims, newClaim];

    const { data, error } = await supabaseAdmin
      .from('serials_warranties')
      .update({ claims_history: updatedClaims, status: 'claimed' })
      .eq('id', record.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data, message: 'Warranty claim submitted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;

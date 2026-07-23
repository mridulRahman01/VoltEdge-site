import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { checkCompatibility } from '../../../shared/compatibility';
import { supabaseAdmin } from '../lib/supabase';
import { validateBody } from '../middleware/validator';

const router = Router();

const validateBuildSchema = z.object({
  components: z.object({
    cpu: z.any().optional(),
    motherboard: z.any().optional(),
    ram: z.any().optional(),
    gpu: z.any().optional(),
    psu: z.any().optional(),
    case: z.any().optional(),
    cooler: z.any().optional(),
    storage: z.any().optional(),
  }),
});

const saveBuildSchema = z.object({
  user_id: z.string().uuid().optional(),
  title: z.string().default('Custom Gaming Rig'),
  components: z.record(z.any()),
  total_price: z.number().min(0),
  estimated_wattage: z.number().int().min(0),
  is_public: z.boolean().default(false),
});

// POST /api/pcbuilder/validate
router.post('/validate', validateBody(validateBuildSchema), (req: Request, res: Response) => {
  const result = checkCompatibility(req.body.components);
  res.json({ success: true, result });
});

// POST /api/pcbuilder/save
router.post('/save', validateBody(saveBuildSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, title, components, total_price, estimated_wattage, is_public } = req.body;
    const share_code = `VE-RIG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const { data, error } = await supabaseAdmin
      .from('pc_builds')
      .insert([
        {
          user_id: user_id || null,
          title,
          components,
          total_price,
          estimated_wattage,
          is_public,
          share_code,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// GET /api/pcbuilder/share/:share_code
router.get('/share/:share_code', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { share_code } = req.params;
    const { data, error } = await supabaseAdmin
      .from('pc_builds')
      .select('*')
      .eq('share_code', share_code)
      .single();

    if (error || !data) {
      res.status(404).json({ success: false, error: 'Saved build not found' });
      return;
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;

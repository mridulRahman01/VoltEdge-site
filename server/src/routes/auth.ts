import { Router, Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../lib/supabase';

const router = Router();

// GET /api/auth/me
router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(410).json({ success: false, error: 'Authorization header missing or invalid' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !userData.user) {
      res.status(401).json({ success: false, error: 'Invalid or expired token' });
      return;
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single();

    if (profileError) {
      console.warn('Profile fetch error, falling back to auth metadata', profileError);
    }

    res.json({
      success: true,
      user: userData.user,
      profile: profile || null,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

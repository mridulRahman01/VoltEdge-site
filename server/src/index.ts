import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import cartRouter from './routes/cart';
import ordersRouter from './routes/orders';
import pcbuilderRouter from './routes/pcbuilder';
import warrantyRouter from './routes/warranty';
import tradeinRouter from './routes/tradein';
import authRouter from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  'http://localhost:4028',
  'http://localhost:3000',
  'http://127.0.0.1:4028',
  process.env.FRONTEND_URL || '',
].filter(Boolean);

app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during development
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'VoltEdge Express API Backend',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/pcbuilder', pcbuilderRouter);
app.use('/api/warranty', warrantyRouter);
app.use('/api/tradein', tradeinRouter);
app.use('/api/auth', authRouter);

// Global Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`⚡ VoltEdge Express API Server running on port ${PORT}`);
  });
}

export default app;

import express from 'express';
import authRoutes from './routes/auth.routes';
import dishRoutes from './routes/dish.routes';
import orderRoutes from './routes/order.routes';

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dishes', dishRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', lab: 'LR5 - Security: bcrypt, JWT & RBAC (Milestone 2)' });
});

export default app;

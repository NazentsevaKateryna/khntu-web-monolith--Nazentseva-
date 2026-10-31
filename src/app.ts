import express from 'express';
import dishRoutes from './routes/dish.routes';
import orderRoutes from './routes/order.routes';

const app = express();

app.use(express.json());

app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', lab: 'LR4 - Variant 7 Food Delivery' });
});

export default app;

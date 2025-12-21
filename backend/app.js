import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import { checkApiKey } from './middlewares/apiKey.js';
import userRoutes from './routes/users.routes.js';
import addressRoutes from './routes/address.routes.js';
import productRoutes from './routes/products.routes.js';
import orderRoutes from './routes/orders.routes.js';

const app = express();

// CORS, open for all domain
app.use(cors());

// Log
app.use(morgan('dev'));

// Parse JSON body
app.use(bodyParser.json());

// Health check endpoint (không cần API Key)
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Áp dụng API Key middleware cho tất cả routes
app.use(checkApiKey);

app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error handlers phải ở cuối cùng
app.use(notFound);
app.use(errorHandler);

export default app;
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import { checkApiKey } from './middlewares/apiKey.js';
import chefRoutes from './routes/chefs.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import dishRoutes from './routes/dishes.routes.js'

const app = express();

// CORS, open for all domain
app.use(cors());

// Log
app.use(morgan('dev'));

// Parse JSON body
app.use(bodyParser.json());

// Áp dụng API Key middleware cho tất cả routes
app.use(checkApiKey);

app.use('/chefs', chefRoutes);
app.use('/categories', categoriesRoutes);
app.use('/dishes', dishRoutes);

// Error handlers phải ở cuối cùng
app.use(notFound);
app.use(errorHandler);

export default app;
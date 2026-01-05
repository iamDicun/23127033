import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import taskRoute from './routes/task.js';
import categoryRoute from './routes/category.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import auth from './middlewares/auth.js';
import restResponse from './middlewares/restResponse.js';

const app = express();

// CORS, open for all domain
app.use(cors());

// Log
app.use(morgan('dev'));

// Parse JSON body
app.use(bodyParser.json());

// Hello world
app.get('/', (_req, res) => {
  res.json({
    message: 'Hello world',
  });
});

// Rest response
app.use(restResponse);

// Check token
app.use(auth);

// Task
app.use('/tasks', taskRoute);
// Category
app.use('/categories', categoryRoute);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;

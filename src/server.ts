import dotenv from 'dotenv';

import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';

import { AppError } from './utils/AppError';

dotenv.config();
const app = express();
app.use(express.json());

app.use(routes);


app.use((error: any, _request: Request, response: Response, _next: NextFunction): void => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({ error: error.message });
    } else {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}...`));
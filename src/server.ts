import express, { NextFunction, Request, Response } from 'express'
import { routes } from './routes';

import { AppError } from './utils/AppError';

const PORT = 3333;

const app = express()
app.use(express.json())

app.use(routes)

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
    }

    return response.status(500).json({ error: error.message });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
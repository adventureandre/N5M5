import dotenv from 'dotenv'; 

import express, { NextFunction, Request, Response } from 'express'
import { routes } from './routes';

import { AppError } from './utils/AppError';

dotenv.config();
const app = express()
app.use(express.json())

app.use(routes)

app.use((error: any, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message })
    }

    response.status(500).json({ error: error.message })
}
)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}...`))
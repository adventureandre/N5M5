import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import jwt from 'jsonwebtoken';

export function myMiddleware(
    request: Request,
    response: Response,
    next: NextFunction) {


    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
        throw new AppError('Token ausente', 401);
    }

    jwt.verify(token, process.env.SECRET_KEY!, (error, token) => {
        if (error) {
            return next(new AppError('Token inválido', 403));
        }

        request.user_token = token as string ;   
        next(); 
    });



}
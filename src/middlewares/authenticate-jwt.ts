import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
export function myMiddleware(
    request: Request,
    response: Response,
    next: NextFunction) {

        const token =  request.headers['authorization']?.split(' ')[1];

        if(!token){
            throw new  AppError('Missing token', 401);
        }

        

}
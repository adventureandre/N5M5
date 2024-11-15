"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myMiddleware = myMiddleware;
const AppError_1 = require("../utils/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function myMiddleware(request, response, next) {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
        throw new AppError_1.AppError('Token ausente', 401);
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, token) => {
        if (error) {
            return next(new AppError_1.AppError('Token inválido', 403));
        }
        request.user_token = token;
        next();
    });
}

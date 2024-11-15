"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const AppError_1 = require("../utils/AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const make_authenticate_use_case_1 = require("../use-cases/factories/make-authenticate-use-case");
const make_get_users_use_case_1 = require("../use-cases/factories/make-get-users-use-case");
class UserController {
    async login(request, response) {
        const { username, password } = request.body; //credentials 
        //const id = request.user_token
        //throw new AppError('Error de exemplo')
        try {
            const authenticateUseCase = (0, make_authenticate_use_case_1.makeAuthenticateUseCase)();
            const { user } = await authenticateUseCase.execute({
                username: username,
                password: password,
            });
            const token = jsonwebtoken_1.default.sign({ session_id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            response.json({ token });
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                response.status(error.statusCode).json({ message: error.message });
            }
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async users(request, response) {
        const token = request.user_token;
        console.log(token);
        try {
            const getUserUseCase = (0, make_get_users_use_case_1.makeGetUsersUseCase)();
            const users = await getUserUseCase.execute();
            response.status(200).json(users);
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                response.status(error.statusCode).json({ message: error.message });
            }
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
exports.UserController = UserController;

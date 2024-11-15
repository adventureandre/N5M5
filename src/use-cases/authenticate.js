"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUseCase = void 0;
const AppError_1 = require("../utils/AppError");
class AuthenticateUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ username, password, }) {
        const user = await this.usersRepository.findByUser(username);
        if (!user) {
            throw new AppError_1.AppError('Usuário e senha inválidos', 401);
        }
        if (user.password != password) {
            throw new AppError_1.AppError('Usuário e senha SEnha inválidos', 401);
        }
        return { user };
    }
}
exports.AuthenticateUseCase = AuthenticateUseCase;

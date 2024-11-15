"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserUseCase = void 0;
const AppError_1 = require("../utils/AppError");
class GetUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute() {
        //receber o id do usuário e validar se tem permissão de admin
        const users = this.usersRepository.findAllUsers();
        if (!users) {
            throw new AppError_1.AppError('Não existem usuários cadastrados', 400);
        }
        return users;
    }
}
exports.GetUserUseCase = GetUserUseCase;

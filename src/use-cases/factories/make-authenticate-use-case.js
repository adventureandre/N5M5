"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticateUseCase = makeAuthenticateUseCase;
const in_memory_user_repository_1 = require("../../repositories/in-memory/in-memory-user-repository");
const authenticate_1 = require("../authenticate");
function makeAuthenticateUseCase() {
    const usersRepository = new in_memory_user_repository_1.InMemoryUsersRepository();
    const authenticateUseCase = new authenticate_1.AuthenticateUseCase(usersRepository);
    return authenticateUseCase;
}

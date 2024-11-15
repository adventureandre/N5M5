"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetUsersUseCase = makeGetUsersUseCase;
const in_memory_user_repository_1 = require("../../repositories/in-memory/in-memory-user-repository");
const get_users_1 = require("../get-users");
function makeGetUsersUseCase() {
    const usersRepository = new in_memory_user_repository_1.InMemoryUsersRepository();
    const getUsersUseCase = new get_users_1.GetUserUseCase(usersRepository);
    return getUsersUseCase;
}

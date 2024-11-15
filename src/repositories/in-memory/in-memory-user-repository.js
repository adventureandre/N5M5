"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUsersRepository = void 0;
const crypto_1 = require("crypto");
class InMemoryUsersRepository {
    constructor() {
        this.users = [
            { "username": "user", "password": "123456", "id": 123, "email": "user@dominio.com", "perfil": "user" },
            { "username": "admin", "password": "123456789", "id": 124, "email": "admin@dominio.com", "perfil": "admin" },
            { "username": "colab", "password": "123", "id": 125, "email": "colab@dominio.com", "perfil": "user" },
        ];
    }
    async findByUser(username) {
        const user = this.users.find((user) => user.username === username);
        return user || null;
    }
    async create(data) {
        const user = {
            id: Number((0, crypto_1.randomUUID)().replace(/\D/g, '').slice(0, 10)), // Convert UUID para um id numérico
            username: data.username,
            password: data.password,
            email: data.email,
            perfil: data.perfil
        };
        this.users.push(user);
        return user;
    }
    async findAllUsers() {
        return this.users;
    }
}
exports.InMemoryUsersRepository = InMemoryUsersRepository;

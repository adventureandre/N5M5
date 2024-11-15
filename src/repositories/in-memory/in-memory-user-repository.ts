import { randomUUID } from "crypto";
import { User } from "../../types/user";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {

    public users: User[] = [
        { "username": "user", "password": "123456", "id": 123, "email": "user@dominio.com", "perfil": "user" },
        { "username": "admin", "password": "123456789", "id": 124, "email": "admin@dominio.com", "perfil": "admin" },
        { "username": "colab", "password": "123", "id": 125, "email": "colab@dominio.com", "perfil": "user" },
    ];

    async findByUser(username: string) {
        const user = this.users.find((user) => user.username === username);
        return user || null;
    }

    async create(data: User) {
        const user: User = {
            id: Number(randomUUID().replace(/\D/g, '').slice(0, 10)), // Convert UUID para um id numérico
            username: data.username,
            password: data.password,
            email: data.email,
            perfil: data.perfil
        };

        this.users.push(user);
        return user;
    }
    async findAllUsers() {
        return this.users
    }
    async findById(id: number) {
        const user = this.users.find(user => user.id === id);
        if (user) {
            return user;
        }
        return null;
    }
}

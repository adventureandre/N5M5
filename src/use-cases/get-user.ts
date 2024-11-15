import { UsersRepository } from "../repositories/users-repository";
import { User } from "../types/user";
import { AppError } from "../utils/AppError";


export class GetUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async getUser(id: number): Promise<User | null> {


        const user = this.usersRepository.findById(id)
        if (!user) {
            throw new AppError('Erro ao Buscar o usuário', 400)
        }

        return user


    }


    async getAllUsers(user: User): Promise<User[] | null> {

        if (user.perfil != "admin") {
            throw new AppError('Você não tem permissão para ver todos os usuários', 403)
        } else {

            const users = this.usersRepository.findAllUsers()
            if (!users) {
                throw new AppError('Não existem usuários cadastrados', 400)
            }

            return users
        }

    }
}
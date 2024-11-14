import { UsersRepository } from "../repositories/users-repository";
import { User } from "../types/user";
import { AppError } from "../utils/AppError";


export class GetUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute(): Promise<User[] | null> {

        //receber o id do usuário e validar se tem permissão de admin

        const users = this.usersRepository.findAllUsers()
        if (!users) {
            throw new AppError('Não existem usuários cadastrados', 400)
        }

        return users 


    }
}
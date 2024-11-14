import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { GetUserUseCase } from "../get-users";

export function makeGetUsersUseCase(){
    const usersRepository = new InMemoryUsersRepository()
    const getUsersUseCase = new GetUserUseCase(usersRepository)

    return getUsersUseCase
}
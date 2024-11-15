import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { GetUserUseCase } from "../get-user";

export function makeGetUserUseCase(){
    const usersRepository = new InMemoryUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    return getUserUseCase
}
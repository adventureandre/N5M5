import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase(){
    const usersRepository =  new InMemoryUsersRepository()
    const authenticateUseCase =  new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}
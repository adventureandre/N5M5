import { UsersRepository } from '../repositories/users-repository'
import { User } from '../types/user'
import { AppError } from '../utils/AppError'

interface AuthenticateUseCaseRequest {
  username: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

    const user = await this.usersRepository.findByUser(username)


    if (!user) {
      throw new AppError('Usuário e senha inválidos', 401)
    }

    if(password.length < 8) {
      throw new AppError('Senha deve ter no mínimo 8 caracteres', 401)
    }

    if(user.password != password){
      throw new AppError('Usuário e senha inválidos', 401)
    }


    return { user }
  }
}

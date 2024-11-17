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

interface LoginAttempt {
  attempts: number
  lastAttempt: number
}

let loginAttempts: Record<string, LoginAttempt> = {}

export class AuthenticateUseCase {

  private static MAX_ATTEMPTS = 3
  private static BLOCK_TIME = 60 * 1000 // 60 seconds


  constructor(private usersRepository: UsersRepository) {}

  private resetLoginAttempts(username: string): void {
    loginAttempts[username] = {
      attempts: 0,
      lastAttempt: Date.now(),
    }
  }

  private shouldBlockLogin(username: string): boolean {
    const attempt = loginAttempts[username]
    if (!attempt) return false

    const { attempts, lastAttempt } = attempt
    if (attempts >= AuthenticateUseCase.MAX_ATTEMPTS) {
      const elapsedTime = Date.now() - lastAttempt
      if (elapsedTime < AuthenticateUseCase.BLOCK_TIME) {
        return true // Bloquear login
      } else {
        this.resetLoginAttempts(username) // Resetar tentativas após o tempo de bloqueio
        return false
      }
    }

    return false
  }

  private incrementLoginAttempts(username: string): void {
    const attempt = loginAttempts[username] || { attempts: 0, lastAttempt: Date.now() }
    attempt.attempts += 1
    attempt.lastAttempt = Date.now()
    loginAttempts[username] = attempt
  }

  async execute({
    username,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

    const user = await this.usersRepository.findByUser(username)

    if (!user) {
      throw new AppError('Usuário e senha inválidos', 401)
    }

    // Verifica se o usuário está bloqueado
    if (this.shouldBlockLogin(username)) {
      throw new AppError('Máximo de tentativas atingido. Tente novamente mais tarde.', 401)
    }

    // Verifica a senha
    if (password.length < 8) {
      this.incrementLoginAttempts(username)
      throw new AppError('Senha deve ter no mínimo 8 caracteres', 401)
    }

    if (user.password !== password) {
      this.incrementLoginAttempts(username)
      throw new AppError('Usuário e senha inválidos', 401)
    }

    // aki ja reseta as tentativas 
    this.resetLoginAttempts(username)

    return { user }
  }
}

import { Request, Response } from "express"
import { AppError } from "../utils/AppError"
import jwt from "jsonwebtoken"
import { makeAuthenticateUseCase } from "../use-cases/factories/make-authenticate-use-case";
import { User } from "../types/user";
import { GetUserUseCase } from "../use-cases/get-users";
import { makeGetUsersUseCase } from "../use-cases/factories/make-get-users-use-case";

class UserController {
    /**
     * index - GET para listar vários registros
     * show - GET para exibir um registro específico
     * create - POST para adicionar um novo registro
     * update - PUT para atualizar um registro existente
     * remove - DELETE para remover um registro existente
     */

    async login(request: Request, response: Response) {

        const { username, password } = request.body; //credentials 

        //const id = request.user_token
        //throw new AppError('Error de exemplo')

        try {
            const authenticateUseCase = makeAuthenticateUseCase()
            const { user } = await authenticateUseCase.execute({
                username: username,
                password: password,
            })

            const token = jwt.sign({ session_id: user.id }, process.env.SECRET_KEY!, { expiresIn: '1h' });
            response.json({ token });

        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Internal Server Error' });
        }

    }

    async users(request: Request, response: Response) {
        const token = request.user_token
        console.log(token)

        try {
            const getUserUseCase = makeGetUsersUseCase()
             const users = await getUserUseCase.execute()
            response.status(200).json(users)

        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Internal Server Error' });
        }

    }
}

export { UserController }
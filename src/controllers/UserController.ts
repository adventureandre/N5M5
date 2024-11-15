import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import { makeAuthenticateUseCase } from "../use-cases/factories/make-authenticate-use-case";
import { makeGetUserUseCase } from "../use-cases/factories/make-get-user-use-case";

class UserController {

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
                response.status(error.statusCode).json({ error: error.message });
                return
            }
            response.status(500).json({ message: 'Internal Server Error' });
        }

    }

    async users(request: Request, response: Response) {
        const user_token = request.user_token

        try {

            const getUserLevel = makeGetUserUseCase()
            const user = await getUserLevel.getUser(user_token.session_id)
            
            if (user) {
                const GetAllUsersUseCase = makeGetUserUseCase()
                const users = await GetAllUsersUseCase.getAllUsers(user)
                response.status(200).json(users)
            }


        } catch (error) {
            if (error instanceof AppError) {
                response.status(error.statusCode).json({ message: error.message });
                return
            }
            response.status(500).json({ message: 'Internal Server Error' });
        }

    }

    async me(request: Request, response: Response) {
        //criar a validaçao das entrada depois
        const user_token  = request.user_token
        console.log(user_token)
        try {
            const GetAllUsersUseCase = makeGetUserUseCase()
            const user = await GetAllUsersUseCase.getUser(user_token.session_id)
            response.status(200).json({
                id: user?.id,
                username: user?.username,
                email: user?.email,
                perfil: user?.perfil,
            })

        } catch (error) {
            if (error instanceof AppError) {
                response.status(error.statusCode).json({ message: error.message });
                return
            }
            response.status(500).json({ message: 'Internal Server Error' });
        }

    }
}

export { UserController }
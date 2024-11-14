import { Request, Response } from "express"
import { AppError } from "../utils/AppError"

import jwt from "jsonwebtoken"
import { makeAuthenticateUseCase } from "../use-cases/factories/make-authenticate-use-case";

class UserController {
    /**
     * index - GET para listar vários registros
     * show - GET para exibir um registro específico
     * create - POST para adicionar um novo registro
     * update - PUT para atualizar um registro existente
     * remove - DELETE para remover um registro existente
     */

    async login(request: Request, response: Response) {

        const { username, password } = request.body;

       // const id = request.user_token
        //throw new AppError('Error de exemplo')

        try {
            const authenticateUseCase = makeAuthenticateUseCase()
            await authenticateUseCase.execute({
                username: username,
                password: password,
            })

            const token = jwt.sign({ username }, process.env.SECRET_KEY!, { expiresIn: '1h' });
            response.json({ token });

        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Internal Server Error' });
        }

    }



    async dashboard(request: Request, response: Response) {
        const { name, price } = request.body

        if (!name) {
            throw new AppError('Name is required', 400)
        }

        if (!price) {
            throw new AppError('Price is required', 400)
        }


        response.status(201).json({
            name, price, user_id: request.user_token

        })
    }
}

export { UserController }
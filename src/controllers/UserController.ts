import { Request, Response } from "express"
import { AppError } from "../utils/AppError"

import jwt from "jsonwebtoken"

class UserController {
    /**
     * index - GET para listar vários registros
     * show - GET para exibir um registro específico
     * create - POST para adicionar um novo registro
     * update - PUT para atualizar um registro existente
     * remove - DELETE para remover um registro existente
     */

    index(request: Request, response: Response) {

        const { username, password } = request.body;

        const id = request.user_token

        //throw new Error('Error de exemplo')
        //throw new AppError('Error de exemplo')

        if (username != 'user' && password != 'password') {
            throw new AppError('Invalid credentials', 401)
   
        }
        
        const token = jwt.sign({username}, process.env.SECRET_KEY!,{ expiresIn: '1h'  });
        response.json({ token });
    }



    create(request: Request, response: Response) {
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
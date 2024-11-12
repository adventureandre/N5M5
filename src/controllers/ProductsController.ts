import { Request, Response } from "express"
import { AppError } from "../utils/AppError"

class ProductsController {
    /**
     * index - GET para listar vários registros
     * show - GET para exibir um registro específico
     * create - POST para adicionar um novo registro
     * update - PUT para atualizar um registro existente
     * remove - DELETE para remover um registro existente
     */

    index(request: Request, response: Response) {

        const id = request.user_id

        //throw new Error('Error de exemplo')
        //throw new AppError('Error de exemplo')

        response.json({ "ver": `Hello, this is the user with ID: ${id}` })
    }



    create(request: Request, response: Response) {
        const { name, price } = request.body

        if(!name) {
            throw new AppError('Name is required', 400)
        }

        if(!price) {
            throw new AppError('Price is required', 400)
        }


        response.status(201).json({ name, price, user_id: request.user_id })
    }
}

export { ProductsController }
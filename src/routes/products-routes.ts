import { Router } from "express";
import { myMiddleware } from "../middlewares/authenticate-jwt";
import { ProductsController } from "../controllers/ProductsController";


export const productsRouter = Router(); 

const productsController = new ProductsController();


productsRouter.get('/:id',myMiddleware, productsController.index )

productsRouter.post('/:id', myMiddleware, productsController.create)
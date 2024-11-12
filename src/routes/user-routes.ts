import { Router } from "express";
import { myMiddleware } from "../middlewares/authenticate-jwt";
import { UserController } from "../controllers/UserController";


export const userRouter = Router(); 

const userController = new UserController();


userRouter.post('/login', userController.index )

userRouter.get('/onfidential-data', myMiddleware, userController.create)
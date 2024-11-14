import { Router } from "express";
import { myMiddleware } from "../middlewares/authenticate-jwt";
import { UserController } from "../controllers/UserController";


export const userRouter = Router(); 

const userController = new UserController();


userRouter.post('/auth/login', userController.login )

userRouter.get('/confidential-data', myMiddleware, userController.dashboard)
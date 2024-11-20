import { Router } from "express";
import { myMiddleware } from "../middlewares/authenticate-jwt";
import { UserController } from "../controllers/UserController";
import { ContractController } from "../controllers/ContractConntroller";


export const userRouter = Router(); 

const userController = new UserController();
const contractController = new ContractController();


userRouter.post('/auth/login', userController.login )

userRouter.get('/auth/me', myMiddleware, userController.me)

userRouter.get('/users', myMiddleware, userController.users)

userRouter.post('/contracts', myMiddleware, contractController.listContracts)
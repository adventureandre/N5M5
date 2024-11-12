import { Router } from "express";
import { userRouter } from "./user-routes";

const routes =  Router();

routes.use("/",userRouter)

export {routes}
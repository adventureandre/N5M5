import { Router } from "express";
import { productsRouter } from "./products-routes";

const routes =  Router();

routes.use("/products",productsRouter)

export {routes}
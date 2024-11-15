"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user-routes");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use("/api", user_routes_1.userRouter);

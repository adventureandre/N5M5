"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const AppError_1 = require("./utils/AppError");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.routes);
app.use((error, request, response, next) => {
    if (error instanceof AppError_1.AppError) {
        return response.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    response.status(500).json({ error: error.message });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));

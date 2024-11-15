class AppError {
    statusCode: number;
    message: string;

    constructor(message: string, statusCode: number = 400) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

export { AppError };

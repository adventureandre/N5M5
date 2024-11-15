type UserToken = {
    session_id: number
    iat: number
    exp: number
}
declare namespace Express {
    export interface Request {
        user_token: UserToken
    }
}


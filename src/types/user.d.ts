export interface User {
    id?: number
    username: string
    password: string 
    email: string
    perfil: "user" | "admin"
}
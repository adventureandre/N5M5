import { User } from "../types/user";

export interface UsersRepository{
    findByUser(username: string): Promise<User | null>
    findById(id:number): Promise<User | null>
    findAllUsers(): Promise<User[] | null>
    create(data:User): Promise<User>
}
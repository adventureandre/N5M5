import { User } from "../types/user";

export interface UsersRepository{
    findByUser(username: string): Promise<User | null>
    create(data:User): Promise<User>
}
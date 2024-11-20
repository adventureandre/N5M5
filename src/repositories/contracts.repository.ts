import { Contract } from "../types/Contract";

export interface ContractsRepository {
    findContractsByFilter(empresa:string, inicio:string):Promise<Contract[]> | null
}
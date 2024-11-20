import { ContractsRepository } from "../repositories/contracts.repository";
import { Contract } from "../types/Contract";


export class GetContractsUseCase {

    constructor(private contractsRepository: ContractsRepository) { }

    async execute( empresa: string, inicio: string): Promise<Contract[] | null> {

        const contracts = await this.contractsRepository.findContractsByFilter(empresa, inicio)
        if (contracts) {
            
            return contracts
        }

        return null


    }

}
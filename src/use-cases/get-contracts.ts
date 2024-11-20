import { ContractsRepository } from "../repositories/contracts.repository";
import { Contract } from "../types/Contract";
import { AppError } from "../utils/AppError";
import { validateInput } from "../utils/validateInput";


export class GetContractsUseCase {

    constructor(private contractsRepository: ContractsRepository) { }

    async execute(empresa: string, inicio: string): Promise<Contract[] | null> {

        // Validando se a entrada é válida
        if (!validateInput(empresa) || !validateInput(inicio)) {
            throw new AppError('Entrada de caracteres inválidos.', 401);
        }

        // Buscando os contratos
        const contracts = await this.contractsRepository.findContractsByFilter(empresa, inicio)
        if (contracts) {

            return contracts
        }

        return null
    }

}
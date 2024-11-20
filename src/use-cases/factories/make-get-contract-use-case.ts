import { InMemoryContractsRepository } from "../../repositories/in-memory/in-memory-contract-repository";
import { GetContractsUseCase } from "../get-contracts";

export function makeGetContractsUseCase() {
    const contractsRepository = new InMemoryContractsRepository()
    const getContractsUseCase = new GetContractsUseCase(contractsRepository)
    return getContractsUseCase
}
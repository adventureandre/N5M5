import { ContractsRepository } from "../contracts.repository";
import { Contract } from "../../types/Contract";

export class InMemoryContractsRepository implements ContractsRepository {
    
    public contracts: Contract[] = [
        { id: 1, empresa: "Empresa A", inicio: "2024-01-01", fim: "2025-01-01", status: "ativo" },
        { id: 2, empresa: "Empresa B", inicio: "2024-03-15", fim: "2024-09-15", status: "inativo" },
        { id: 3, empresa: "Empresa C", inicio: "2024-02-10", fim: "2024-08-10", status: "ativo" },
        { id: 4, empresa: "Empresa A", inicio: "2023-11-01", fim: "2024-11-01", status: "inativo" },
        { id: 5, empresa: "Empresa D", inicio: "2024-05-20", fim: "2025-05-20", status: "ativo" },
        { id: 6, empresa: "Empresa E", inicio: "2024-06-01", fim: "2024-12-01", status: "inativo" },
        { id: 7, empresa: "Empresa A", inicio: "2024-07-01", fim: "2025-07-01", status: "ativo" },
        { id: 8, empresa: "Empresa C", inicio: "2024-04-01", fim: "2025-04-01", status: "inativo" }
    ];
    
    
    async findContractsByFilter(empresa: string, inicio: string){
        const filteredContracts = this.contracts.filter(contract => {
            return contract.empresa === empresa && contract.inicio === inicio;
        });

        return filteredContracts;
    }
  
}

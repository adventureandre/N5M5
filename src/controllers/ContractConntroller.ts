import { Request, Response } from "express";
import { makeGetContractsUseCase } from "../use-cases/factories/make-get-contract-use-case";
import { AppError } from "../utils/AppError";

class ContractController {
    async listContracts(request: Request, response: Response) {

        const { empresa, inicio } = request.body


        try {

            const contractsUseCase = makeGetContractsUseCase();

            const contracts = await contractsUseCase.execute(
                empresa,
                inicio
            )

            response.json(contracts )

        } catch (error) {
            if (error instanceof AppError) {
                response.status(error.statusCode).json({ error: error.message });
                return
            }
            response.status(500).json({ message: 'Internal Server Error' });
        }


    }
}

export { ContractController }
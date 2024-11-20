export interface Contract {
    id: number
    empresa: string
    inicio: string
    fim: string
    status: "ativo" | "inativo"
}
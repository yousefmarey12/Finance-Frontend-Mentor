import { Transaction } from "../components/medium/transactions/transactions.component";

export interface BudgetDetail {
    category: string,
    freeAmount: string,
    spentAmount: string,
    transactions: Transaction[],
    colorTheme: string
}
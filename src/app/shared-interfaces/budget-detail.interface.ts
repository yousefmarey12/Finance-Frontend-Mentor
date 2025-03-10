import { Transaction } from "../components/pages/home/transactions/transactions.component";
import { Dropdown } from "./dropdown.interface";

export interface BudgetDetail {
    category: string,
    freeAmount: string,
    spentAmount: string,
    transactions: Transaction[],
    theme: Dropdown,
    target?: string,
    amount?: string
}
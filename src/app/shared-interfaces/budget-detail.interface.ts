import { Transaction } from "../components/medium/transactions/transactions.component";
import { Dropdown } from "./dropdown.interface";

export interface BudgetDetail {
    category: Dropdown,
    freeAmount: string,
    spentAmount: string,
    transactions: Transaction[],
    colorTheme: Dropdown
}
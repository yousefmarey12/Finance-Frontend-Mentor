import { Dropdown } from "./dropdown.interface";

export interface Pot {
    amount: string,
    category: Dropdown,
    theme: Dropdown,
    target: string
}
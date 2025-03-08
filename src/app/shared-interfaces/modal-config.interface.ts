import { AbstractControl, FormGroup, ValidationErrors} from "@angular/forms"
import { Dropdown } from "./dropdown.interface"
import { BudgetDetail } from "./budget-detail.interface";
import { Pot } from "./pot.interface";
type Validator = (any1: any, any2: any) => (control: AbstractControl) => ValidationErrors | null; // ✅ Capitalized

interface Prompt {
    title: string,
    formKey: string,
    maxChar?: number,
    placeholder:  Dropdown,
    validation: Validator[],
    values?: Dropdown[]
}

export interface Button {
    title: string,
    task(index: number, form: FormGroup): void
}

export interface ModalConfig {
    title: (item?: Pot | BudgetDetail | null) => string,
    description: string,
    prompts: Prompt[],
    buttons: Button[]
    key: string
}
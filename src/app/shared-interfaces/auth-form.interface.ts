import { Button } from "./modal-config.interface"

interface IconInterface {
    svg: () => string,
    onClick?: () => any
}

interface inputField {
    label: string,
    description?: string
    icon?: IconInterface,
    formKey: string
    type: () => string
}



export interface AuthForm {
  title: string,
  inputs: inputField[],
  buttons: Button[],
  formDescription?: () => string 
}
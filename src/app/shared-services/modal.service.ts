import { inject, Injectable, signal } from "@angular/core";
import { BudgetDetail } from "../shared-interfaces/budget-detail.interface";
import { Pot } from "../shared-interfaces/pot.interface";
import { BudgetService } from "./budget.service";
import { PotService } from "./pot.service";
import { CRUD } from "../shared-interfaces/crud.interface";
import { ModalConfig } from "../shared-interfaces/modal-config.interface";
import { AbstractControl, ControlEvent, FormGroup, NgControlStatus } from "@angular/forms";
import { Dropdown } from "../shared-interfaces/dropdown.interface";
import { ActivatedRoute, Router } from "@angular/router";
// We will first have to dictiate what type it is:

// new, edit, or delete
export type Item = BudgetDetail | Pot
function isNumber(n: any = 0, n2: any = 0) {
    return function validateNum(control: AbstractControl) {
        if (isNaN(control.value)) {
          return { notNumber: true };
        }
        return null;
      }
}


function validateRange(min: number, max: number) {
    return function(control: AbstractControl) {
        
        if (control.value > min && control.value <= max) {
            return null
        }
        return {outOfRange: true}
    }
}

@Injectable( {providedIn: 'root'} )
export class ModalService {
    
    potService = inject(PotService)
    budgetService = inject(BudgetService)
    router = inject(Router)
    route = inject(ActivatedRoute)
    
    currentIndex!: number;

    colors: Dropdown[] = [
        {title: "Green", code: '#277C78', alreadyUsed: true},
        {title: "Yellow", code: '#F2CDAC', alreadyUsed: true},
        {title: "Cyan", code: '#82C9D7', alreadyUsed: true},
        {title: "Navy", code: '#626070', alreadyUsed: true},
        {title: "Red", code: '#C94736', alreadyUsed: false},
        {title: "Purple", code: '#826CB0', alreadyUsed: false},
        {title: "Turquoise", code: '#597C7C', alreadyUsed: false},
        {title: "Brown", code: '#93674F', alreadyUsed: false},
        {title: "Magenta", code: '#934F6F', alreadyUsed: false},
        {title: "Blue", code: '#3F82B2', alreadyUsed: false},
        {title: "Grey", code: '#97A0AC', alreadyUsed: false},
        {title: "Army", code: '#7F9161', alreadyUsed: false},
        {title: "Pink", code: '#AF81BA', alreadyUsed: false},
        {title: "Pink", code: '#BE6C49', alreadyUsed: false}
      ]
    modalOn = signal<boolean>(false)
    modals: ModalConfig[] = [
        {
        title: () => 'Add New Pot', 
        description: 'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.',
        prompts: [
            {
                placeholder: {title: 'e.g Rainy Days'},
                maxChar: 30,
                title: 'Pot name',
                formKey: 'name',
                validation: [],
            },
            {
                placeholder: {title: '$ e.g. 2000'},
                maxChar: 10,    
                title: 'Target',
                formKey: 'target',
                validation: [isNumber],
            },
            {
                placeholder:  {title: "Green", code: '#277C78', alreadyUsed: true},
                title: 'Theme',
                maxChar: 1000,
                formKey: 'theme',
                validation: [],
                values: this.colors
            }

        ],
            buttons: [{
                title: 'Add Pot',
                task: (index, form) => {

                    this.potService.addItem(form.value) // implement type-safety
                },
            }],
            key: 'pot-add'
        },
        {
            title: (item) => 'Edit ' + (item ? item.category : ''), 
            description: 'If your saving targets change, feel free to update your pots.',
            prompts: [
                {
                    placeholder:  {title: 'Concert Ticket'},
                    maxChar: 30,
                    formKey: 'name',
                    title: 'Pot name',
                    validation: [(n1: any = 0, n2: any = 0) => (control: AbstractControl) => {
                   
                        if ( this.modals[0].prompts[0].maxChar) {
                            return control.value >  this.modals[0].prompts[0].maxChar ? {charsExceed: true} : null
                        }
                        return null;
                    }]
                },
                {
                    placeholder: {title: '$ e.g. 2000'},
                    maxChar: 10, // default
                    title: 'Target',
                    formKey: 'target',
                    validation: [isNumber],
                },
                {
                    placeholder: {title: "Green", code: '#277C78', alreadyUsed: true},
                    title: 'Theme',
                    formKey: 'theme',
                    maxChar: 1000,
                    validation: [],
                    values: this.colors
                }
    
            ],
            buttons: [{
                    title: 'Save Changes',
                    task: (index, form) => {
                        this.potService.editItem(index, form.value) // implement type-safety
                    },
                }],
            key: 'pot-edit'
            },
            {
                title: (item) => 'Deposit in ' + (item ? item.category : '') ,
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.',
                key: 'pot-deposit',
                prompts: [
                    {
                        placeholder:  {title: '$'},
                        validation: [isNumber, validateRange],
                        formKey: 'deposit',
                        title: 'Amount to Add',
                    }
                ],
                buttons: [
                    {
                        title: 'Confirm Addition',
                        task: (index: number, form: FormGroup) => {
                         this.potService.deposit(index, form.value.deposit)   
                        }
                    }
                ]
            },
            {
                title: (item) => 'Withdraw in ' + (item ? item.category : ''),
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.',
                key: 'pot-withdraw',
                prompts: [
                    {
                        placeholder:  {title: '$'},
                        validation: [isNumber, validateRange],
                        formKey: 'withdraw',
                        title: 'Amount to Withdraw',
                    }
                ],
                buttons: [
                    {
                        title: 'Confirm Withdraw',
                        task: (index: number, form: FormGroup) => {
                         this.potService.withdraw(index, form.value.withdraw)   
                        }
                    }
                ]
            },
            {
                title: (item) => `Delete ${(item ? item.category : '')}`, 
                description: 'Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.',
                prompts: [
                  
                ],
                    buttons: [{
                        title: 'Yes, Confirm Deletion',
                        task: (index, form) => {
                            this.potService.deleteItem(index) // implement type-safety
                        },
                    },
                {
                    title: 'No, Go Back',
                    task: (index, form) => {
                        this.router.navigate(['../..'], {
                            relativeTo: this.route
                        })
                    } 
                }],
            key: 'pot-delete'
            },
            {
                title: () => 'Add New Budget', 
                description: 'Choose a category to set a spending budget. These categories can help you monitor spending.',
                prompts: [
                    {
                        placeholder: {title: 'Entertainment'},
                        title: 'Budget Category',
                        formKey: 'category',
                        validation: [],
                        values: this.budgetService.getBudgetDetails()().map((detail) => {
                            return {code: detail.theme.title, title: detail.category}
                        })
                    },
                    {
                        placeholder: {title: '$ e.g. 2000'},
                        title: 'Maximum Spend',
                        formKey: 'spend',
                        validation: [isNumber],
                    },
                    {
                        placeholder:  {title: "Green", code: '#277C78', alreadyUsed: true},
                        title: 'Theme',
                        validation: [],
                        formKey: 'theme',
                        values: this.colors
                    }
        
                ],
                    buttons: [{
                        title: 'Add Budget',
                        task: (index, form) => {
                            console.log(form.value)
                            let obj: BudgetDetail = {
                                category: form.value.category,
                                freeAmount: form.value.spend,
                                spentAmount: '0',
                                transactions: [],
                                theme: form.value.theme,
                            }
                            this.budgetService.addItem(obj) // implement type-safety
                        },
                    }],
            key: 'budget-add'
                },
                {
                    title: (item) => 'Edit ' + (item ? item.category : ''), 
                    description: 'As your budgets change, feel free to update your spending limits.',
                    prompts: [
                        {
                            placeholder:   {title: 'Entertainment'},
                            title: 'Budget Category',
                            formKey: 'category',
                            validation: [(n1: any = 0, n2: any = 0) => (control: AbstractControl) => {
                   
                                if ( this.modals[0].prompts[0].maxChar) {
                                    return control.value >  this.modals[0].prompts[0].maxChar ? {charsExceed: true} : null
                                }
                                return null;
                            }],
                            values: this.budgetService.getBudgetDetails()().map((detail) => {
                                return {code: detail.theme.title, title: detail.category }
                            })
                        },
                        {
                            placeholder: {title: '$ 50'},
                            maxChar: 10, // default
                            formKey: 'spend',
                            title: 'Maximum Spend',
                            validation: [isNumber],
                        },
                        {
                            placeholder:  {title: "Green", code: '#277C78', alreadyUsed: true},
                            title: 'Theme',
                            formKey: 'theme',
                            validation: [],
                            values: this.colors
                        }
            
                    ],
                    buttons: [{
                            title: 'Save Changes',
                            task: (index, form) => {
                                let obj: BudgetDetail = {
                                    category: form.value.category,
                                    freeAmount: form.value.spend,
                                    spentAmount: '0',
                                    transactions: [],
                                    theme: form.value.theme,
                                }
                                this.budgetService.editItem(index, obj) // implement type-safety
                            },
                        }],
            key: 'budget-edit'
                    },
                    {
                        title: (item) => `Delete ` + (item ? item.category : ''), 
                        description: 'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.',
                        prompts: [
                          
                        ],
                            buttons: [{
                                title: 'Yes, Confirm Deletion',
                                task: (index, form) => {
                                    this.budgetService.deleteItem(index) // implement type-safety
                                },
                            },
                        {
                            title: 'No, Go Back',
                            task: (index, form) => {
                                this.router.navigate(['../..'], {
                                    relativeTo: this.route
                                })
                            } 
                        }],
            key: 'budget-delete'
                    },
    ]


    async getConfig(str: string, index: number) {
        this.modalOn.set(true)
        console.log("getConfig Str is")

        console.log(str)
        for (let modal of this.modals) {
            if (str == modal.key ) {

                if (modal.key.includes('budget') && this.router.url.match(/\d+/g)?.at(0)) {
                    return {
                        item: index ? this.budgetService.getBudget(index) : null,
                        modal: modal
                    }
                }
                else  {
                    console.log("index is")
                    console.log(index)
                    
                    return {
                        item: index > -1 ? await this.potService.getPot(index) : null,
                        modal: modal
                    }
                }
                
            }
        }
        throw Error("Invalid Key!!!")
     
    }
}
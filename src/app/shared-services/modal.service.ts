import { inject, Injectable, signal } from "@angular/core";
import { BudgetDetail } from "../shared-interfaces/budget-detail.interface";
import { Pot } from "../shared-interfaces/pot.interface";
import { BudgetService } from "./budget.service";
import { PotService } from "./pot.service";
import { CRUD } from "../shared-interfaces/crud.interface";
// We will first have to dictiate what type it is:

// new, edit, or delete
export type Item = BudgetDetail | Pot
@Injectable( {providedIn: 'root'} )
export class ModalService {
    modalOn = signal<boolean>(false)
    onAdd(service: CRUD<Item>, data: Item): void {
        try {
            service.addItem(data)
        }
        catch (e) {
            console.error(e)
        }
       
    }


    onEdit(service: CRUD<Item>, index: number, newData: Item) {
        try {
            service.editItem(index, newData)
        }
        catch (e) {
            console.error(e)
        }
    }

    onDelete(service: CRUD<Item>, index: number) {
        try {
            service.deleteItem(index)
        }
        catch (e) {
            console.error(e)
        }
    }

}
import { Injectable, Signal, signal } from '@angular/core';
import { MediaQuery } from '../shared-interfaces/media-query.interface';
import { Transaction } from '../components/pages/home/transactions/transactions.component';
import { BudgetDetail } from '../shared-interfaces/budget-detail.interface';
import { CRUD } from '../shared-interfaces/crud.interface';

@Injectable({
  providedIn: 'root',
})
export class BudgetService implements CRUD<BudgetDetail> {

    private budgetDetails = signal<BudgetDetail[]>([
        {
            category: 'Entertainment', 
            spentAmount: '25.00', freeAmount: '50.00', theme: {title: '#277C78'},
            transactions: [
                {isCredit: false, person: 'Papa Software', amount: '10.00', date: '16 Aug 2024'},
                {isCredit: false, person: 'Quebec Services', amount: '5.00', date: '12 Aug 2024'},
                {isCredit: false, person: 'Romeo Cloud Service', amount: '10.00', date: '5 Aug 2024'},
            ]
        },
        {
            category: 'Bills', 
            spentAmount: '250.00', freeAmount: '750.00', theme: {title: '#82C9D7'},
            transactions: [
                {isCredit: false, person: 'Charlie Electric Company', amount: '100.00', date: '1 Aug 2024'},
                {isCredit: false, person: 'Foxtrot Waterline', amount: '100.00', date: '1 Aug 2024'},
                {isCredit: false, person: 'Tango Gas Company', amount: '50.00', date: '1 Aug 2024'},
            ]
        },
        {
            category: 'Dining Out', 
            spentAmount: '67.00', freeAmount: '8.00', theme:{title: '#F2CDAC'},
            transactions: [
                {isCredit: false, person: 'Lima Dining House', amount: '30.00', date: '21 Aug 2024'},
                {isCredit: false, person: 'Yuna Kim', amount: '21.50', date: '20 Aug 2024'},
                {isCredit: false, person: 'Juliet Restaurant', amount: '15.50', date: '12 Aug 2024'},
            ]
        },
        {
            category: 'Personal Care', 
            spentAmount: '65.00', freeAmount: '35.00', theme: {title: '#626070'},
            transactions: [
                {isCredit: false, person: 'Bravo Zen Spa', amount: '25.00', date: '29 Aug 2024'},
                {isCredit: false, person: 'Sofia Peterson', amount: '15.00', date: '15 Aug 2024'},
                {isCredit: false, person: 'Bravo Zen Spa', amount: '25.00', date: '13 Aug 2024'},
            ]
        }
    ] ) 

    getBudgetDetails(): Signal<BudgetDetail[]> {
        return this.budgetDetails
    }

    addItem(details: BudgetDetail) {
        console.log("does add button work?")
        this.budgetDetails.update((val) => {
            val.push(details)
            return val;
        })
    }
    editItem(index: number, newDetails: BudgetDetail): void {
        this.budgetDetails.update(details => {
            return details.map((val, i) => {
                if (index == i) {
                    val = newDetails
                }
                return val;
            })
            
        })

    }
    getBudget(index: number) {
        if (index >= this.budgetDetails().length) {
            throw Error("Out of bounds.")
        }
        else {
            return this.budgetDetails()[index];
        }
    }

   
    

    deleteItem(index: number): void {
        this.budgetDetails.set(this.budgetDetails().filter((el, currentIndex) => {
            if (index != currentIndex) {
                return true
            }
            return false;
        }))
    }

}
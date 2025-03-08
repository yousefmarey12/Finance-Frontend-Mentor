import { inject, Injectable, Signal, signal } from '@angular/core';
import { MediaQuery } from '../shared-interfaces/media-query.interface';
import { Transaction } from '../components/pages/home/transactions/transactions.component';
import { BudgetDetail } from '../shared-interfaces/budget-detail.interface';
import { CRUD } from '../shared-interfaces/crud.interface';
import { AuthService } from './auth.service';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService implements CRUD<BudgetDetail> {
authService = inject(AuthService)
    database = getDatabase(this.authService.app)

    budgets: BudgetDetail[] = [
        
    ]

    budgetsChanged = new Subject<BudgetDetail[]>()

    async getBudgetDetails() {
     return get(ref(this.database, `users/${this.authService.uid()}/budgets`)).then((val) => {
            this.budgets = val.val()|| []
            return this.budgets 
        })
    }

    async addItem(form: any) {
                console.log("form budget")
                console.log(form)
                   await this.getBudgetDetails()
                   let budget: BudgetDetail = {
                       freeAmount: '0',
                       spentAmount: form.spend,
                       transactions: [],
                       ...form
                   }
                   this.editItem(this.budgets.length, budget)
   
    }
    async editItem(index: number, newDetails: BudgetDetail) {
          await this.getBudgetDetails()
                   if (this.authService.uid()) {
                    set(ref(this.database, 'users/' + this.authService.uid()  + '/budgets/' +index.toString()), newDetails)
                    .then(async () => {
                       await this.getBudgetDetails()
                       this.budgetsChanged.next(this.budgets)
                    })
                    
                   }
            
        }

    
    async getBudget(index: number) {
     let pot = await get(ref(this.database, 'users/' + this.authService.uid() + '/budgets/' + index));
     
             if (pot) {
                 return pot.val()
             }
             else {
                throw Error("Budget does not exist")
             }
    }

   
    

   async deleteItem(index: number) {
        await this.getBudgetDetails()
                  remove(ref(this.database, 'users/' + this.authService.uid() + '/budgets/' + index.toString()))
                  
                  for (let i = index; i < index - 1; i++) {
                      this.editItem(index, this.budgets[index + 1])
                  }
    }

}
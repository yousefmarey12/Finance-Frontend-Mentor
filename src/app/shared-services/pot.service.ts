import { inject, Injectable, Signal, signal } from '@angular/core';
import { Transaction } from '../components/pages/home/transactions/transactions.component';
import { Pot } from '../shared-interfaces/pot.interface';
import { CRUD } from '../shared-interfaces/crud.interface';
import { PotItem } from '../shared-interfaces/pot-Item.interface';
import { getDatabase , ref, set, get, child, onValue, remove } from 'firebase/database';
import {AuthService} from "./auth.service"
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PotService implements CRUD<Pot> {
    authService = inject(AuthService)
    
    database = getDatabase(this.authService.app)

    private getNumbers = (str: string) => {
        if (isNaN(+str)) {
            throw Error("Not a Number")
        }
        let regex = /^(\d+)(\.)?(\d+)?/
        let [,int, dot1, decimal] = str.match(regex) || []
        return [int, decimal]
    }


    private addDecimals = (str1: string, str2: string) => {
        let [int1, decimal1] = this.getNumbers(str1)
        let [int2, decimal2] = this.getNumbers(str2)
    
        let int = +int1 + +int2;
        let decimal 
        if (decimal1 && decimal2) {
            decimal = +decimal1 + +decimal2
        }
        else {
            if (!decimal1) {
                if (!decimal2) {
                    decimal = '00'
                }
                else {
                    decimal = decimal2
                }
              
            }
            else {
               decimal = decimal1
            }
        }
        console.log("int")
        console.log(int)
        console.log(decimal)
        return (int + '.' + (decimal.toString()).slice(0, 2))
    }

    
    private subtractDecimals = (str1: string, str2: string) => {
        let [int1, decimal1] = this.getNumbers(str1)
        let [int2, decimal2] = this.getNumbers(str2)
    
        let int = +(int1 || 0) - +(int2 || 0);
        if (decimal1.length == 1) {
            decimal1 += '0'
        }
        if (decimal2.length == 1) {
            decimal2 += '0'
        }
       
        let decimal = +(decimal1 || 0) - +(decimal2 || 0)
       
        if (decimal < 0) {
            int--
            decimal = +((decimal * -1).toString().slice(0, 2))
            decimal = 100 - decimal
        }
        return (int + '.' + (decimal.toString()).slice(0, 2))
    }
        potsArr: Pot[] = [

        ]
        pots: Pot[] =  [
        
    ]

    potsChanged = new Subject<Pot[]>()
 async getPotDetails() {
        return get(ref(this.database, `users/${this.authService.uid()}/pots`)).then((val) => {
            this.pots = val.val()|| []
            console.log("pots in pot.service")
            console.log(val.val())
            return this.pots 
        })

}
/*
    We need a system for CRUD Pots & CRUD Budgets

    A pot is composed of the following:
        amount => string
        category => string
        theme => an object with the display value and actual value (dropdown)
        target => string
    The ultimate source of data is the firebase realtime database with 2 keys.
        {
            users:
                    {
                        id:
                            {
                                pots: {}
                                budgets: {}
                            }
                    }
        }
        Now of course any CRUD to the database is async. We will use either observables or promises.
        Getting (Reading) should be a subscription because we always want to get the current state of the database
        The others will be promise as in it will just be a one time thing and done, what we will do after the promise is get the current state of the 
        database and then set it locally to the user.
*/

    async getPot(index: number) {
        let pot = await get(ref(this.database, 'users/' + this.authService.uid() + '/pots/' + index));

        if (pot) {
            return pot.val()
        }
        else {
           throw Error("Pot does not exist")
        }
    }

    

   
       async addItem(details: any) {
            await this.getPotDetails()
            let pot: Pot = {
                category: details.name,
                amount: '0',
                ...details,
            }
            this.editItem(this.pots.length, pot)
        }

       

        async editItem(index: number, newDetails: Pot) {
            await this.getPotDetails()
            if (this.authService.uid()) {
             set(ref(this.database, 'users/' + this.authService.uid()  + '/pots/' +index.toString()), newDetails)
             .then(async () => {
                await this.getPotDetails()
                this.potsChanged.next(this.pots)
             })
             
            }
        }

        deposit(index: number, amount: number) {
            try {
               this.getPot(index).then((val) => {
         
                val.amount = this.addDecimals(val.amount.toString(), amount.toString())
                console.log(val)
                this.editItem(index, val)
               })
           
    
               
            }
            catch (e) {
               console.error("Amount could not be completed. Try Again")
               console.error(e)
            }
       }


        withdraw(index: number, withdrawAmount: number) {
        
             try {
                this.getPot(index).then((val) => {
                    let amountNum = +val.amount
                    amountNum -= withdrawAmount
                    val.amount = amountNum.toFixed(2).toString();
                    this.editItem(index, val)
                })
                
               
            
              
             }
             catch (e) {
                console.error("Withdraw could not be completed. Try Again")
                console.error(e)
             }
        }

        
// we want to fetch
        async deleteItem(index: number) {
           // first we want to fetch the array of pots for the particular user
           // second we want to delete the index and the content
           // then, we have a reference to the array after the deleted index, and we basically reset it but with the index before it
           // we do the same thing until the end of the array
           await this.getPotDetails()
           remove(ref(this.database, 'users/' + this.authService.uid() + '/pots/' + index.toString()))
           
           for (let i = index; i < index - 1; i++) {
               this.editItem(index, this.pots[index + 1])
           }
        }
}
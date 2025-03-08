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
    refDb = ref(this.database)

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
        pots = new BehaviorSubject<Pot[]>( [
        {
            category: {title: 'Savings' },
            theme: {title: '#277C78'},
            amount: '159.00',
            target: '2000.00'
        },
        {
            category: {title: 'Concert Ticket' },
            theme: {title: '#626070'},
            amount: '110.00',
            target: '150.00'
        },
        {
            category:  {title: 'Gift' },
            theme: {title: '#82C9D7'},
            amount: '40.00',
            target: '60.00'
        },
        {
            category: {title: 'New Laptop' },
            theme: {title: '#F2CDAC'},
            amount: '10.00',
            target: '1000.00'
        },
        {
            category: {title: 'Holiday' },
            theme: {title: '#826CB0'},
            amount: '531.00',
            target: '1440.00'
        },
    ])
async getPotDetails() {
        onValue(ref(this.database, `users/${this.authService.uid()}`), (snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.exists())
            console.log(snapshot.val())
            this.pots.next(snapshot.val())
           }
       })
    
}


    async getPot(index: number) {
        let pot = await get(ref(this.database, 'users/' + this.authService.uid() + '/' + index));

        if (pot) {
            return pot.val()
        }
        else {
           throw Error("Pot does not exist")
        }
    }

   
        addItem(details: any) {
         
        //    this.pots.next()
            
        
            if (this.authService.uid()) {
            this.pots.subscribe((val) => {
                set(ref(this.database, 'users/' + this.authService.uid()), val);

            })
        }
        }

       

        async editItem(index: number, newDetails: Pot) {
            return set(ref(this.database, 'users/' + this.authService.uid()  + '/' +index.toString()), newDetails);
        
        }

        deposit(index: number, amount: number) {
            try {
               this.getPot(index).then((val) => {
                console.log("val")
                console.log(val.amount)
                console.log(amount)
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
           remove(ref(this.database, 'users/' + this.authService.uid() + '/' + index.toString()))
           this.pots.subscribe((val) => {
            while(index != val.length -1) {
                this.editItem(index, val[index + 1])
                index++
           }  
           })
           
           
        }
}
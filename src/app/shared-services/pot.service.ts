import { Injectable, Signal, signal } from '@angular/core';
import { Transaction } from '../components/medium/transactions/transactions.component';
import { Pot } from '../shared-interfaces/pot.interface';
import { CRUD } from '../shared-interfaces/crud.interface';
import { PotItem } from '../shared-interfaces/pot-Item.interface';

@Injectable({
  providedIn: 'root',
})
export class PotService implements CRUD<Pot> {
    pots = signal<Pot[]>(
        [
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
        ]
    )
getPotDetails(): Signal<Pot[]> {
        return this.pots
    }


    getPot(index: number) {
        
        if (index >= this.pots().length) {
            throw Error("Out of bounds.")
        }
        else {
            return this.pots()[index];
        }
    }

   
        addItem(details: any) {
            this.pots.update((val) => {
                val.push({
                    theme: {title: details.theme.title},
                    target: details.target,
                    category: {title: details.name},
                    amount: '0'
                })
                return val;
            })
        }

        editItem(index: number, newDetails: Pot): void {
            this.pots.update(details => {
                return details.map((val, i) => {
                    if (index == i) {
                        val = newDetails
                    }
                    return val;
                })
                
            })
        }

        deposit(index: number, withdrawAmount: number) {
            try {
               let pot = this.getPot(index)
               let amountNum = +pot.amount
               amountNum += withdrawAmount
               pot.amount = amountNum.toFixed(2).toString();
               this.editItem(index, pot)
            }
            catch (e) {
               console.error("Withdraw could not be completed. Try Again")
               console.error(e)
            }
       }


        withdraw(index: number, withdrawAmount: number) {
             try {
                let pot = this.getPot(index)
                let amountNum = +pot.amount
                amountNum -= withdrawAmount
                pot.amount = amountNum.toFixed(2).toString();
                this.editItem(index, pot)
             }
             catch (e) {
                console.error("Withdraw could not be completed. Try Again")
                console.error(e)
             }
        }

        

        deleteItem(index: number): void {
            this.pots.set(this.pots().filter((el, currentIndex) => {
                if (index != currentIndex) {
                    return true
                }
                return false;
            }))
        }
}
import { Injectable, Signal, signal } from '@angular/core';
import { Transaction } from '../components/medium/transactions/transactions.component';
import { Pot } from '../shared-interfaces/pot.interface';

@Injectable({
  providedIn: 'root',
})
export class PotService {
    pots = signal<Pot[]>(
        [
            {
                category: 'Savings',
                theme: '#277C78',
                amount: '159.00',
                target: '2000.00'
            },
            {
                category: 'Concert Ticket',
                theme: '#626070',
                amount: '110.00',
                target: '150.00'
            },
            {
                category: 'Gift',
                theme: '#82C9D7',
                amount: '40.00',
                target: '60.00'
            },
            {
                category: 'New Laptop',
                theme: '#F2CDAC',
                amount: '10.00',
                target: '1000.00'
            },
            {
                category: 'Holiday',
                theme: '#826CB0',
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

    removePot(index: number): void {
        this.pots.set(this.pots().filter((el, currentIndex) => {
            if (index != currentIndex) {
                return true
            }
            return false;
        }))
    }

}
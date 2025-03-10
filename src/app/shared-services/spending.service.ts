import { Injectable } from '@angular/core';
import { MediaQuery } from '../shared-interfaces/media-query.interface';
import { Transaction } from '../components/pages/home/transactions/transactions.component';

@Injectable({
  providedIn: 'root',
})
export class SpendingService {
    private latestSpending: Transaction[] = [
        {isCredit: true, person: 'Charlie Electric Company', date: '1 Aug 2024', amount: '100.00'},
        {isCredit: true, person: 'Foxtrot Waterline', date: '1 Aug 2024', amount: '100.00'},
        {isCredit: true, person: 'Tango Gas Company', date: '1 Aug 2024', amount: '50.00'},
    ] 

    getLatestSpending(): Transaction[] {
      return this.latestSpending
    }
}
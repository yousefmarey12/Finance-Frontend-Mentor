import { Component, computed, inject } from '@angular/core';
import { Transaction } from '../home/transactions/transactions.component';
import { TransactionComponent } from '../../util-components/transaction/transaction.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../util-components/input-field/input-field.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { PaginationBtnComponent } from '../../util-components/pagination-btn/pagination-btn.component';
import { DropdownComponent } from '../../util-components/dropdown/dropdown.component';
import { Dropdown } from '../../../shared-interfaces/dropdown.interface';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [TransactionComponent, CommonModule, InputFieldComponent, PaginationBtnComponent, DropdownComponent  ],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css'
})
export class TransactionsPageComponent {
  dropdownValuesSort: Dropdown[] = [
    {title: 'Latest', code: '', alreadyUsed: false},
    {title: 'Oldest', code: '', alreadyUsed: false},
    {title: 'A to Z', code: '', alreadyUsed: false},
    {title: 'Z to A', code: '', alreadyUsed: false},
    {title: 'Highest', code: '', alreadyUsed: false},
    {title: 'Lowest', code: '', alreadyUsed: false},
  ]

  dropdownValuesCategory: Dropdown[] = [
    {title: 'Entertainment', code: '', alreadyUsed: false},
    {title: 'Bills', code: '', alreadyUsed: false},
    {title: 'Groceries', code: '', alreadyUsed: false},
    {title: 'Dining Out', code: '', alreadyUsed: false},
    {title: 'Transportation', code: '', alreadyUsed: false},
    {title: 'Personal Care', code: '', alreadyUsed: false},
    {title: 'Education', code: '', alreadyUsed: false},
    {title: 'Lifestyle', code: '', alreadyUsed: false},
    {title: 'Shopping', code: '', alreadyUsed: false},
    {title: 'General', code: '', alreadyUsed: false},
  ]
  currentPage: number = 2;
  transactions: Transaction[] = [
    {isCredit: false, person: "Bravo Zen Spa", amount: "25.00", date: "29 Aug 2024", category: 'Personal Care'},
    {isCredit: true, person: "Alpha Analytics", amount: "450.00", date: "27 Aug 2024", category: 'General'},
    {isCredit: false, person: "Echo Game Store", amount: "21.50", date: "22 Aug 2024", category: 'Lifestyle'},
    {isCredit: false, person: "Food Merchant", amount: "21.50", date: "20 Aug 2024", category: 'General'},
    {isCredit: false, person: "Delta Taxi", amount: "15.00", date: "19 Aug 2024", category: "Transportation"},
    {isCredit: false, person: "Online Shop", amount: "15.00", date: "15 Aug 2024", category: "General"},
    {isCredit: false, person: "Bravo Zen Spa", amount: "25.00", date: "13 Aug 2024", category: "Personal Care"},
    {isCredit: false, person: "Liam Hughes", amount: "10.00", date: "5 Aug 2024", category: "General"},
    {isCredit: true, person: "Alpha Analytics", amount: "1900.00", date: "3 Aug 2024", category: "General"},
    {isCredit: false, person: "Charlie Electronic Co...", amount: "100.00", date: "1 Aug 2024", category: "Bills"},
  ]
  #mediaQueryService = inject(MediaQueryService)
           isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
           isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
           isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
            activeNumbers: number[] = [2]

           onClickPage(num: number) {
            if (!(num in this.activeNumbers)) {
              this.activeNumbers.push(num)
            }
      
           }
}

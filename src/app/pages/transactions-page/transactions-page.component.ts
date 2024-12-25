import { Component, computed, inject } from '@angular/core';
import { Transaction } from '../../components/medium/transactions/transactions.component';
import { TransactionComponent } from '../../components/small/transaction/transaction.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../components/medium/input-field/input-field.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../shared-services/media-query.service';
import { TransactionTabletComponent } from '../../components/medium/transaction-tablet/transaction-tablet.component';
import { PaginationBtnComponent } from '../../components/small/pagination-btn/pagination-btn.component';
import { DropdownComponent } from '../../components/medium/dropdown/dropdown.component';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [TransactionComponent, CommonModule, InputFieldComponent, TransactionTabletComponent, PaginationBtnComponent, DropdownComponent  ],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css'
})
export class TransactionsPageComponent {
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

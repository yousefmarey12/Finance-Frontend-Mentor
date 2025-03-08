import { Component, computed, inject, OnInit } from '@angular/core';
import { Transaction } from '../home/transactions/transactions.component';
import { TransactionComponent } from '../../util-components/transaction/transaction.component';
import { CommonModule, formatNumber } from '@angular/common';
import { InputFieldComponent } from '../../util-components/input-field/input-field.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { PaginationBtnComponent } from '../../util-components/pagination-btn/pagination-btn.component';
import { DropdownComponent } from '../../util-components/dropdown/dropdown.component';
import { Dropdown } from '../../../shared-interfaces/dropdown.interface';
import { DateService } from '../../../shared-services/date.service';
import { TransactionsService } from '../../../shared-services/transactions.service';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [TransactionComponent, CommonModule, InputFieldComponent, PaginationBtnComponent, DropdownComponent  ],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css'
})
export class TransactionsPageComponent implements OnInit {
  private _transactions: Transaction[] = [];
   transactionsService = inject(TransactionsService)
   transactions: Transaction[] = []
   dropdownValuesCategory: Dropdown[] = []
   dropdownValuesSort: Dropdown[] = []
  ngOnInit(): void {
      this.transactions = this.transactionsService.getTransactions()
      this._transactions = this.transactions
      this.dropdownValuesCategory = this.transactionsService.getCategories()
      this.dropdownValuesSort = this.transactionsService.getSorting()
  }

  handleCategoryChange(ev: Dropdown) {
      if (ev.fn) {
        this.transactions = ev.fn(this._transactions, ev.title)
      }
  }

  handleSortChange(ev: Dropdown) {
    if (ev.fn) {
      this.transactions = ev.fn(this.transactions)

    }
  }
  filterBySearch(ev: string) {
   this.transactions = this._transactions.filter((el) => {
    if (ev != '') {
      return el.person.includes(ev)
    }
      return true;
    })
  }
  
  currentPage: number = 2;
 
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

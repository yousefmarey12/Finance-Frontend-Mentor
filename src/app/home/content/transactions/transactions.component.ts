import { Component, computed, inject } from '@angular/core';
import { TertiaryComponent } from '../../../components/buttons/tertiary/tertiary.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { MediaQuery } from '../../../shared-interfaces/media-query.interface';
import { toSignal } from '@angular/core/rxjs-interop';
export interface Transaction {
  isCredit: boolean,
  person: string,
  amount: string,
  date: string
}
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TertiaryComponent, TransactionComponent, CommonModule, HeaderComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
    transactions: Transaction[] = [
      {isCredit: true, person: "Emma Richardson", amount: "75.50", date: "19 Aug 2024"},
      {isCredit: false, person: "Savory Bites Bistro", amount: "55.50", date: "19 Aug 2024"},
      {isCredit: false, person: "Daniel Carter", amount: "42.30", date: "18 Aug 2024"},
      {isCredit: true, person: "Sun Park", amount: "120.00", date: "17 Aug 2024"},
      {isCredit: false, person: "Urban Services Hub", amount: "65.00", date: "17 Aug 2024"},
    ]

      #mediaQueryService = inject(MediaQueryService)
         isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
         isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
         isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
}
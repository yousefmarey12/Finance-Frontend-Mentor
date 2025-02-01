import { ChangeDetectorRef, Component, computed, effect, inject, NgZone, OnInit } from '@angular/core';
import { BalanceOverviewComponent } from './balance-overview/balance-overview.component';
import { PotsComponent } from './pots/pots.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BillsComponent } from './bills/bills.component';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { MediaQuery } from '../../../shared-interfaces/media-query.interface';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BalanceOverviewComponent, PotsComponent, TransactionsComponent, BudgetsComponent, BillsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
 #mediaQueryService = inject(MediaQueryService)
  isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
  isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
  isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
   
    
  
}

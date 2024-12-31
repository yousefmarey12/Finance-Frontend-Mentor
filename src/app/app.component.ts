import { AfterViewInit, Component, computed, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MediaQueryService } from './shared-services/media-query.service';
import { NavigationComponent } from './components/medium/navigation/navigation.component';
import { toSignal } from "@angular/core/rxjs-interop"
import { CommonModule } from '@angular/common';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { DropdownComponent } from './components/medium/dropdown/dropdown.component';
import { SpendingSummaryComponent } from './components/large/spending-summary/spending-summary.component';
import { BudgetDetailComponent } from './components/large/budget-detail/budget-detail.component';
import { BudgetsPageComponent } from './pages/budgets-page/budgets-page.component';
import { ModalComponent } from './components/large/modal/modal.component';
import { PotComponent } from './components/large/pot/pot.component';
import { PotsPageComponent } from './pages/pots-page/pots-page.component';
import { RecurringBillComponent } from './components/medium/recurring-bill/recurring-bill.component';
import { ButtonComponent } from './components/small/button/button.component';
import { TransactionComponent } from './components/small/transaction/transaction.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionComponent , HomeComponent, NavigationComponent, CommonModule, TransactionsPageComponent, DropdownComponent, SpendingSummaryComponent, BudgetDetailComponent, BudgetsPageComponent, ModalComponent, PotComponent, PotsPageComponent, RecurringBillComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
   #mediaQueryService = inject(MediaQueryService)
   isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
   isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
   isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))

  modalOn: boolean = true;
   
    setModalOff(val: boolean) {
      this.modalOn = val;
    }


}

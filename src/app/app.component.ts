import { AfterViewInit, Component, computed, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MediaQueryService } from './shared-services/media-query.service';
import { NavigationComponent } from './components/util-components/navigation/navigation.component';
import { toSignal } from "@angular/core/rxjs-interop"
import { CommonModule } from '@angular/common';
import { TransactionsPageComponent } from './components/pages/transactions-page/transactions-page.component';
import { DropdownComponent } from './components/util-components/dropdown/dropdown.component';
import { SpendingSummaryComponent } from './components/pages/budgets-page/spending-summary/spending-summary.component';
import { BudgetDetailComponent } from './components/pages/budgets-page/budget-detail/budget-detail.component';
import { BudgetsPageComponent } from './components/pages/budgets-page/budgets-page.component';
import { ModalComponent } from './components/util-components/modal/modal.component';
import { PotComponent } from './components/pages/pots-page/pot/pot.component';
import { PotsPageComponent } from './components/pages/pots-page/pots-page.component';
import { RecurringBillComponent } from './components/pages/bills-page/recurring-bill/recurring-bill.component';
import { ButtonComponent } from './components/util-components/button/button.component';
import { TransactionComponent } from './components/util-components/transaction/transaction.component';
import { BillsPageComponent } from './components/pages/bills-page/bills-page.component';
import { ModalService } from './shared-services/modal.service';
import { AuthPageComponent } from "./components/pages/auth-page/auth-page.component";
import { AuthService } from './shared-services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionComponent, HomeComponent, NavigationComponent, CommonModule, TransactionsPageComponent, DropdownComponent, SpendingSummaryComponent, BudgetDetailComponent, BudgetsPageComponent, ModalComponent, PotComponent, PotsPageComponent, RecurringBillComponent, ButtonComponent, BillsPageComponent, AuthPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   authService =  inject(AuthService)
   router = inject(Router)
   #mediaQueryService = inject(MediaQueryService)
   isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
   isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
   isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
   modalService = inject(ModalService)
   modalOn = this.modalService.modalOn
   
 

}

import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { BalanceOverviewComponent } from '../../home/overview/balance-overview/balance-overview.component';
import { PotsComponent } from '../../home/content/pots/pots.component';
import { TransactionsComponent } from '../../home/content/transactions/transactions.component';
import { BudgetsComponent } from '../../home/content/budgets/budgets.component';
import { BillsComponent } from '../../home/content/bills/bills.component';
import { MediaQueryService } from '../../shared-services/media-query.service';
import { MediaQuery } from '../../shared-interfaces/media-query.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BalanceOverviewComponent, PotsComponent, TransactionsComponent, BudgetsComponent, BillsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  #mediaQueryService = inject(MediaQueryService)
  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}
  viewports: MediaQuery = {
      isDesktop: false,
      isMobile: false,
      isTablet: false
    }
  ngOnInit(): void {
    
    this.#mediaQueryService.viewports.subscribe(viewports => {
      this.ngZone.run(() => {

    
      this.viewports.isDesktop = viewports.isDesktop
      this.viewports.isMobile = viewports.isMobile
      this.viewports.isTablet = viewports.isTablet
      this.cdr.detectChanges();
    })
    })
  }
}

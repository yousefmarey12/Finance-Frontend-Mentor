import { Component, computed, inject, OnInit } from '@angular/core';
import { PrimaryComponent } from '../../components/small/buttons/primary/primary.component';
import { SpendingSummaryComponent } from '../../components/large/spending-summary/spending-summary.component';
import { BudgetDetailComponent } from '../../components/large/budget-detail/budget-detail.component';
import { SpendingService } from '../../shared-services/spending.service';
import { BudgetService } from '../../shared-services/budget.service';
import { BudgetDetail } from '../../shared-interfaces/budget-detail.interface';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../shared-services/media-query.service';

@Component({
  selector: 'app-budgets-page',
  standalone: true,
  imports: [CommonModule, PrimaryComponent, SpendingSummaryComponent, BudgetDetailComponent],
  templateUrl: './budgets-page.component.html',
  styleUrl: './budgets-page.component.css'
})
export class BudgetsPageComponent implements OnInit {
 budgetDetails: BudgetDetail[] = []
 #mediaQueryService = inject(MediaQueryService)
          isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
          isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
          isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
  constructor(private budgetDetailService: BudgetService) {}
  ngOnInit(): void {
      let temp = this.budgetDetailService.getBudgetDetails();
      for (let i = 0; i < temp.length; i++) {
        this.budgetDetails.push(temp[i]);
      }
  }
}

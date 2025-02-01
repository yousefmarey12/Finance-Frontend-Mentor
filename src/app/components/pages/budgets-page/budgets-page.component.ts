import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { SpendingSummaryComponent } from './spending-summary/spending-summary.component';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { SpendingService } from '../../../shared-services/spending.service';
import { BudgetService } from '../../../shared-services/budget.service';
import { BudgetDetail } from '../../../shared-interfaces/budget-detail.interface';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { ButtonComponent } from '../../util-components/button/button.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ModalService } from '../../../shared-services/modal.service';

@Component({
  selector: 'app-budgets-page',
  standalone: true,
  imports: [ButtonComponent, CommonModule, SpendingSummaryComponent, BudgetDetailComponent, RouterOutlet],
  templateUrl: './budgets-page.component.html',
  styleUrl: './budgets-page.component.css'
})
export class BudgetsPageComponent implements OnInit {
 budgetDetails: BudgetDetail[] = []
 router = inject(Router)
 route = inject(ActivatedRoute)
 #mediaQueryService = inject(MediaQueryService)
          isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
          isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
          isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
      navigateToNew() {
        this.router.navigate(['new'], {
          relativeTo: this.route
        })
      }

      modalService = inject(ModalService)
      modalOn = this.modalService.modalOn
  constructor(private budgetDetailService: BudgetService) {
    effect(() => {
      this.budgetDetails = this.budgetDetailService.getBudgetDetails()()
    })
  }
  ngOnInit(): void {
     }
}

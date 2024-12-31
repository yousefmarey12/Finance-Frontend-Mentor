import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { SpendingSummaryComponent } from '../spending-summary/spending-summary.component';
import { MiniCardComponent } from '../../small/mini-card/mini-card.component';
import { HeaderComponent } from '../../medium/header/header.component';
import { TransactionComponent } from '../../small/transaction/transaction.component';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../medium/transactions/transactions.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { IconDropdownComponent } from '../../small/icon-dropdown/icon-dropdown.component';
import { ButtonComponent } from '../../small/button/button.component';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [CommonModule, SpendingSummaryComponent, MiniCardComponent, HeaderComponent, TransactionComponent, DisplayMoney, IconDropdownComponent, ButtonComponent],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css'
})
export class BudgetDetailComponent implements OnInit {
  @Input() colorTheme: string = ''
  @Input() freeAmount: string = ''
  @Input() spentAmount: string = ''
  @Input() title: string = ''
  @Input() transactions: Transaction[] = []
  @Input() index!: string
  maximum: string = ''
  amountPercentage: string = '' 
#mediaQueryService = inject(MediaQueryService)
       isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
       isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
       isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
  ngOnInit(): void {
  this.maximum = ((+this.spentAmount) + (+this.freeAmount)).toString()
  this.amountPercentage = (((+this.freeAmount)/(+this.maximum)) * 100).toString()
  }
}

import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { SpendingSummaryComponent } from '../spending-summary/spending-summary.component';
import { MiniCardComponent } from '../../../util-components/mini-card/mini-card.component';
import { HeaderComponent } from '../../../util-components/header/header.component';
import { TransactionComponent } from '../../../util-components/transaction/transaction.component';
import { DisplayMoney } from '../../../../shared-pipes/display-number.pipe';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../home/transactions/transactions.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../../shared-services/media-query.service';
import { IconDropdownComponent, navigationConfig } from '../../../util-components/icon-dropdown/icon-dropdown.component';
import { ButtonComponent } from '../../../util-components/button/button.component';
import { Dropdown } from '../../../../shared-interfaces/dropdown.interface';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [CommonModule, SpendingSummaryComponent, MiniCardComponent, HeaderComponent, TransactionComponent, DisplayMoney, IconDropdownComponent, ButtonComponent],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css'
})
export class BudgetDetailComponent implements OnInit {
  @Input() colorTheme: Dropdown = {title: ''}
  @Input() freeAmount: string = ''
  @Input() spentAmount: string = ''
  @Input() title: Dropdown = {title: ''}
  @Input() transactions: Transaction[] = []
  items: navigationConfig[] = []
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
  this.items  = [
    {
      title: 'Edit Budget',
      path: ('edit/' + this.index)
    },
    {
      title: 'Delete Budget',
      path: ('delete/' + this.index)
    }
  ]
  }
 
}

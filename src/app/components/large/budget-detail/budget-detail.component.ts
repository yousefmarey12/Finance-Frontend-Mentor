import { Component, Input } from '@angular/core';
import { SpendingSummaryComponent } from '../spending-summary/spending-summary.component';
import { MiniCardComponent } from '../../small/mini-card/mini-card.component';
import { HeaderComponent } from '../../medium/header/header.component';
import { TransactionComponent } from '../../small/transaction/transaction.component';
import { TertiaryComponent } from '../../small/buttons/tertiary/tertiary.component';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [CommonModule, SpendingSummaryComponent, MiniCardComponent, HeaderComponent, TransactionComponent, TertiaryComponent, DisplayMoney],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css'
})
export class BudgetDetailComponent {
  @Input() colorTheme: string = ''
  @Input() freeAmount: string = ''
  @Input() spentAmount: string = ''
  @Input() title: string = ''
  maximum = ((+this.freeAmount) + this.spentAmount).toString()

  amountPercentage: string = ((+this.freeAmount)/(+this.maximum)).toString()

  
}

import { Component } from '@angular/core';
import { BalanceOverviewComponent } from '../../home/overview/balance-overview/balance-overview.component';
import { PotsComponent } from '../../home/content/pots/pots.component';
import { TransactionsComponent } from '../../home/content/transactions/transactions.component';
import { BudgetsComponent } from '../../home/content/budgets/budgets.component';
import { BillsComponent } from '../../home/content/bills/bills.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BalanceOverviewComponent, PotsComponent, TransactionsComponent, BudgetsComponent, BillsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}

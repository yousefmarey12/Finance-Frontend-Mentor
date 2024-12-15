import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CurrencyPipe, DisplayMoney],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
  @Input() isDark: boolean = true
  @Input() subtitle: string = "Balance"
  @Input() amount: string = '3814.25'
}

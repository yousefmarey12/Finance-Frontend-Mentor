import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { MediaQuery } from '../../../shared-interfaces/media-query.interface';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CurrencyPipe, DisplayMoney, CommonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
  @Input() isDark: boolean = true
  @Input() subtitle: string = "Balance"
  @Input() amount: string = '3814.25'

}

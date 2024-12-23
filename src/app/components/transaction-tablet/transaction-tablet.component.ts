import { Component, Input } from '@angular/core';
import { DisplayMoney } from '../../shared-pipes/display-number.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-tablet',
  standalone: true,
  imports: [DisplayMoney, CommonModule],
  templateUrl: './transaction-tablet.component.html',
  styleUrl: './transaction-tablet.component.css'
})
export class TransactionTabletComponent {
  @Input() amount: string = '75.50'
  @Input() isCredit: boolean = true;
  @Input() person: string = "Emma Richardson"
  @Input() date: string = "19 Aug 2024"
  @Input() category: string = ''
  @Input() isHeader: boolean = false
}

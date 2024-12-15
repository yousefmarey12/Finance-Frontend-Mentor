import { Component, Input } from '@angular/core';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [DisplayMoney],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  @Input() amount: string = '75.50'
  @Input() isCredit: boolean = true;
  @Input() person: string = "Emma Richardson"
  @Input() date: string = "19 Aug 2024"
}

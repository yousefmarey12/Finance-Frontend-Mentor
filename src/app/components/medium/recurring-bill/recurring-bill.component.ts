import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recurring-bill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recurring-bill.component.html',
  styleUrl: './recurring-bill.component.css'
})
export class RecurringBillComponent {
  @Input() amount: string = '250.00' 
  @Input() title: string = 'Elevate Education' 
  @Input() day: string = '5th' 
  @Input() isPaid: boolean = true;
}

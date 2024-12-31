import { Component } from '@angular/core';
import { DisplayMoney } from '../../shared-pipes/display-number.pipe';
import { InputFieldComponent } from '../../components/medium/input-field/input-field.component';
interface RecurringBill {
  amount: string,
  title: string,
  day: string,
  isPaid: boolean
}
@Component({
  selector: 'app-bills-page',
  standalone: true,
  imports: [DisplayMoney, InputFieldComponent],
  templateUrl: './bills-page.component.html',
  styleUrl: './bills-page.component.css'
})
export class BillsPageComponent {
  bills: RecurringBill[] = [
    {title: "Elevate Education", day: "1st", amount: "250.00", isPaid: true}
  ]
}

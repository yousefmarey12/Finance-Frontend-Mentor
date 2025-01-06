import { Component, OnInit } from '@angular/core';
import { DisplayMoney } from '../../shared-pipes/display-number.pipe';
import { InputFieldComponent } from '../../components/medium/input-field/input-field.component';
import { RecurringBillComponent } from '../../components/medium/recurring-bill/recurring-bill.component';
import { CommonModule } from '@angular/common';
interface RecurringBill {
  amount: string,
  title: string,
  day: string,
  isPaid: boolean
}
@Component({
  selector: 'app-bills-page',
  standalone: true,
  imports: [DisplayMoney, InputFieldComponent, RecurringBillComponent, CommonModule],
  templateUrl: './bills-page.component.html',
  styleUrl: './bills-page.component.css'
})
export class BillsPageComponent implements OnInit {
  totalPaid: string = ''
  totalDue: string = ''
  numberOfPaid: string = ''
  numberOfDue: string = ''
  ngOnInit(): void {
    let amount = 0;
    let num = 0
    this.bills.forEach((bill) => {
      if (!bill.isPaid) {
        num++;
        amount += +bill.amount
      }
    })
    this.totalDue = amount.toString();
    this.numberOfDue = num.toString();
    amount = 0;
    num = 0;
    this.bills.forEach((bill) => {
      if (bill.isPaid) {
        num++;
        amount += +bill.amount
      }    
    })
    this.totalPaid = amount.toString(); 
    this.numberOfPaid = num.toString()
  }
  bills: RecurringBill[] = [
    {title: "Elevate Education", day: "1st", amount: "250.00", isPaid: true},
    {title: "Bravo Zen Spa", day: "3rd", amount: "70.00", isPaid: true},
    {title: "Charlie Electric Company", day: "5th", amount: "10.00", isPaid: false},
    {title: "Delta Taxi", day: "6th", amount: "30.00", isPaid: false},
    {title: "Echo Game Store", day: "12th", amount: "5.00", isPaid: true},
    {title: "Echo Game Store", day: "16th", amount: "10.00", isPaid: true},
    {title: "Tango Gas Company", day: "22nd", amount: "225.00", isPaid: true},
    {title: "Juliet Restaurant", day: "28th", amount: "950.00", isPaid: true},
  ]

  
}

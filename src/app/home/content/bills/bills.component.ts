import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { BillComponent } from '../../../components/bill/bill.component';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [HeaderComponent, BillComponent],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {

}

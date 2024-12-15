import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DisplayMoney } from '../../shared-pipes/display-number.pipe';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [CommonModule, DisplayMoney],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {
  @Input() color: string = ''
  @Input() title: string = ''
  @Input() amount: string = ''
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [CommonModule, DisplayMoney],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.css'
})
export class AccountCardComponent {
  @Input() isDark: boolean = true;
  @Input() amount: string = '250.00'
  @Input() subtitle: string = 'Current Balance'
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';

@Component({
  selector: 'app-mini-card',
  standalone: true,
  imports: [CommonModule, DisplayMoney],
  templateUrl: './mini-card.component.html',
  styleUrl: './mini-card.component.css'
})
export class MiniCardComponent {
  @Input() color: string = ''
  @Input() title: string = ''
  @Input() amount: string = ''
  @Input() budget: string = ''
} 

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-btn.component.html',
  styleUrl: './navigation-btn.component.css'
})
export class NavigationBtnComponent {
  @Input() btnTitle: string = ''
}

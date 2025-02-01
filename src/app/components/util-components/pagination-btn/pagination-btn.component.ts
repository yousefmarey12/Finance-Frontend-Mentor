import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-btn.component.html',
  styleUrl: './pagination-btn.component.css'
})
export class PaginationBtnComponent {
  @Input() isNext: boolean = true
}

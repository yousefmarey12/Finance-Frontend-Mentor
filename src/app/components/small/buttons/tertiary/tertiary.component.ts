import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tertiary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tertiary.component.html',
  styleUrl: './tertiary.component.css'
})
export class TertiaryComponent {
  @Input() transparent: boolean = false
  @Input() hasIcon: boolean = true
}

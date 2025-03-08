import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonState } from '../../../shared-interfaces/button-state.interface';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() state: ButtonState = {
    primary: true,
    secondary: false,
    tertiary: false,
    destroy: false,
  }

  @Input() type = 'submit'
  @Input() disabled = false
}

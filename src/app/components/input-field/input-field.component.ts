import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
export interface InputType {
  basic: boolean,
  withIcon: boolean,
  withPrefix: boolean,
  withColorTag: boolean,
  isBold: boolean
}
@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
    @Input() inputType: InputType = {
      basic: true,
      withIcon: false,
      withPrefix: false,
      withColorTag: false,
      isBold: false
    }
    @Input() placeholder: string = ''
    @Input() iconImg: string = ''

    getIconValue() {
      return `url("${this.iconImg}") 95% 50% no-repeat`
    }
}

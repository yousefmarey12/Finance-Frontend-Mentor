import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { DropdownComponent } from '../../medium/dropdown/dropdown.component';
import { InputFieldComponent } from '../../medium/input-field/input-field.component';
import { PrimaryComponent } from '../../small/buttons/primary/primary.component';
import { CommonModule } from '@angular/common';
import { Dropdown } from '../../../shared-interfaces/dropdown.interface';

export type Modal = | "Add" | "Edit" | "Delete"

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent, InputFieldComponent, PrimaryComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  categories: Dropdown[] = [
    {title: "Entertainment", code: '', alreadyUsed: false},
    {title: "Bills", code: '', alreadyUsed: false},
    {title: "Groceries", code: '', alreadyUsed: false},
    {title: "Dining out", code: '', alreadyUsed: false},
    {title: "Transportation", code: '', alreadyUsed: false},
    {title: "Education", code: '', alreadyUsed: false},
    {title: "Lifestyle", code: '#597C7C', alreadyUsed: false},
    {title: "Shopping", code: '', alreadyUsed: false},
    {title: "General", code: '', alreadyUsed: false},
  ]

  colors: Dropdown[] = [
    {title: "Green", code: '#277C78', alreadyUsed: true},
    {title: "Yellow", code: '#F2CDAC', alreadyUsed: true},
    {title: "Cyan", code: '#82C9D7', alreadyUsed: true},
    {title: "Navy", code: '#626070', alreadyUsed: true},
    {title: "Red", code: '#C94736', alreadyUsed: false},
    {title: "Purple", code: '#826CB0', alreadyUsed: false},
    {title: "Turquoise", code: '#597C7C', alreadyUsed: false},
    {title: "Brown", code: '#93674F', alreadyUsed: false},
    {title: "Magenta", code: '#934F6F', alreadyUsed: false},
    {title: "Blue", code: '#3F82B2', alreadyUsed: false},
    {title: "Grey", code: '#97A0AC', alreadyUsed: false},
    {title: "Army", code: '#7F9161', alreadyUsed: false},
    {title: "Pink", code: '#AF81BA', alreadyUsed: false},
    {title: "Pink", code: '#BE6C49', alreadyUsed: false}
  ]

  onExit() {
    this.modalOn.next(true)
  }
    form = new FormGroup({
      category: new FormControl(null, [Validators.required]),
      maximum: new FormControl(null, [Validators.required, validateNum]),
      theme: new FormControl(null, [Validators.required])
    })

    @Input() type: Modal = "Edit"
    @Output() modalOn = new EventEmitter<boolean>();

    onSubmit() {
      console.log(this.form)
    }

}
function validateNum(control: AbstractControl) {
  if (isNaN(control.value)) {
    return { notNumber: true };
  }
  return null;
}
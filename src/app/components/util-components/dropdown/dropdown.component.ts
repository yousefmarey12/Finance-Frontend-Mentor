import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HoverDirective } from '../../../shared-directives/hover.directive';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Dropdown } from '../../../shared-interfaces/dropdown.interface';
@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, HoverDirective],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  animations: [
    trigger('clickDropdown', [
      state('open', style({
        'opacity': 1
      })),
      state('close', style({
        'opacity': 0
      })),
      transition('open <=> close', [animate('400ms')])
    ])
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: DropdownComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DropdownComponent
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor, Validator  {
 
  writeValue(val: any): void {
      this.value = val;
  }
  registerOnChange(fn: any): void {
      this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
      this.disabled = isDisabled;
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.dropdownValues.includes(control.value)) {
      return null;
    }
    return {invalidValue: "This value is not valid."}
  }
 
  dropdownState: string = 'close'
  touched: boolean = false
  disabled: boolean = false
  @Input() placeholder: Dropdown = {code: '', title: 'Placeholder', alreadyUsed: false}
  @Input() dropdownValues: Dropdown[] = []
 
  active: boolean = false
  
  value!: Dropdown
  onChange = (val: any) => {}
  onTouched = () => {}
  onClickItem(value: Dropdown) {
    if (!this.disabled) {
          this.value = value;
          this.placeholder = value
          this.onChange(this.value);
    }

  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onClick() {
    this.markAsTouched()
    if (this.dropdownState == 'close') {
      this.dropdownState = 'open'
    }
    else {
      this.dropdownState = 'close'
    }
    this.active = true;
  }

  
  

}

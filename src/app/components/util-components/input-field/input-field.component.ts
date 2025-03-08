import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
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
  styleUrl: './input-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: InputFieldComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputFieldComponent
    }
  ]
})

export class InputFieldComponent implements ControlValueAccessor, Validator {
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
      if (this.type == 'number') {
        if (isNaN(control.value)) {
          return {notNumber: "Not a number"}
        }
       
      }
      return null;
    }
    touched: boolean = false
  disabled: boolean = false
  active: boolean = false
  @Output() inputChange = new EventEmitter<string>()
  value: string = ''
  onChange = (val: any) => {
    this.inputChange.emit(val)
  }
  onTouched = () => {}
    @Input() type: string = 'text'
    @Input() inputType: InputType = {
      basic: true,
      withIcon: false,
      withPrefix: false,
      withColorTag: false,
      isBold: false
    }
    @Input() placeholder: string = ''
    @Input() iconImg: string = ''
    @ViewChild('input') input!: ElementRef
  
    markAsTouched() {
      if (!this.touched) {
        this.onTouched();
        this.touched = true;
      }
    }
  
    setValue(val: string) {
      this.markAsTouched()
      this.value = val;
      this.onChange(this.value)
      this.active = true;
      console.log(this.value)
    }
    getIconValue() {
      return `url("${this.iconImg}") 95% 50% no-repeat`
    }
}

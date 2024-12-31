import { Component, computed, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { DropdownComponent } from '../../medium/dropdown/dropdown.component';
import { InputFieldComponent } from '../../medium/input-field/input-field.component';
import { CommonModule } from '@angular/common';
import { Dropdown } from '../../../shared-interfaces/dropdown.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { BudgetService } from '../../../shared-services/budget.service';
import { BudgetDetail } from '../../../shared-interfaces/budget-detail.interface';
import { ButtonComponent } from '../../small/button/button.component';


export type Modal = | "Add" | "Edit" | "Delete"

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent, InputFieldComponent, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  budget!: BudgetDetail
  constructor(private budgetDetailService: BudgetService) {}
  ngOnInit(): void {
    this.budget = this.budgetDetailService.getBudget(+this.budgetKeyReference)
  }
  @Input() budgetKeyReference: string = ''

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
    this.modalOn.emit(true)
  }
    form = new FormGroup({
      category: new FormControl(null, [Validators.required]),
      maximum: new FormControl(null, [Validators.required, validateNum]),
      theme: new FormControl(null, [Validators.required])
    })

    @Input() type: Modal = "Delete"
    @Output() modalOn = new EventEmitter<boolean>();

    onSubmit() {
      console.log(this.form)
    }

    onDelete() {
      this.budgetDetailService.removeBudget(+this.budgetKeyReference)
      this.onExit()
    }

    #mediaQueryService = inject(MediaQueryService)
           isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
           isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
           isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
    

}
function validateNum(control: AbstractControl) {
  if (isNaN(control.value)) {
    return { notNumber: true };
  }
  return null;
}
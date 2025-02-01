import { Component, computed, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { DropdownComponent } from '../dropdown/dropdown.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { CommonModule } from '@angular/common';
import { Dropdown } from '../../../shared-interfaces/dropdown.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { BudgetService } from '../../../shared-services/budget.service';
import { BudgetDetail } from '../../../shared-interfaces/budget-detail.interface';
import { ButtonComponent } from '../button/button.component';
import { ModalService } from '../../../shared-services/modal.service';
import { PotService } from '../../../shared-services/pot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pot } from '../../../shared-interfaces/pot.interface';


export type Modal =  "Add" | "Edit" | "Delete"
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent, InputFieldComponent, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {
  router = inject(Router)
  route = inject(ActivatedRoute)
  modalService = inject(ModalService)
  service!: BudgetService | PotService
  budget!: BudgetDetail
  pot!: Pot
  form!: FormGroup
  type!: Modal
  constructor(private budgetDetailService: BudgetService, private potsService: PotService) {}
  ngOnDestroy(): void {
    this.modalService.modalOn.set(false)
  }
  ngOnInit(): void {
    console.log("budget key reference")
    console.log(this.budgetKeyReference)
    this.modalService.modalOn.set(true)
    if (this.router.url.includes('edit')) {
      this.type = 'Edit'
      let matches =  this.router.url.match(/(\d+)$/)
      if (matches) {
        this.budgetKeyReference = matches[0]
      }
    }
    else {
      if (this.router.url.includes('new')) {
        this.type = 'Add'
      }
      else {
        this.type = 'Delete'
      }
    }
    console.log("budget key reference")
    console.log(this.budgetKeyReference)
    this.service = this.router.url.includes('pots') ? this.potsService : this.budgetDetailService
    this.pot = this.potsService.getPot(+this.budgetKeyReference)
    console.log("yo my fav pot is")
    console.log(this.pot)
    this.budget = this.budgetDetailService.getBudget(+this.budgetKeyReference)
   if (this.serviceStr == 'budgets') {
    this.form = new FormGroup({
      category: new FormControl(null, [Validators.required]),
      maximum: new FormControl(null, [Validators.required, validateNum]),
      theme: new FormControl(null, [Validators.required])
   }) 
   } else {
   this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      target: new FormControl(null, [Validators.required, validateNum]),
      theme: new FormControl(null, [Validators.required]),
  })
   } 
  }
  budgetKeyReference: string = this.router.url.split('/')[3]
  getCurrentCategory() {
      if (this.serviceStr == 'budgets') {
        let budget = this.budgetDetailService.getBudget(+this.budgetKeyReference)
        return {
          title: budget.category.title,
          code: '',
          alreadyUsed: false
        }
      }
      console.log("helllooooo")
      let pot = this.potsService.getPot(+this.budgetKeyReference)
      console.log(pot)
      return {
        title: pot.category.title,
        code: '',
        alreadyUsed: false
      }
      
  }
  serviceStr: string = this.router.url.includes('pots') ? 'pots' : 'budgets'
  categories: Dropdown[] = [
    {title: "Entertainment", code: '', alreadyUsed: false},
    {title: "Bills", code: '', alreadyUsed: false},
    {title: "Groceries", code: '', alreadyUsed: false},
    {title: "Dining out", code: '', alreadyUsed: false},
    {title: "Transportation", code: '', alreadyUsed: false},
    {title: "Education", code: '', alreadyUsed: false},
    {title: "Lifestyle", code: '', alreadyUsed: false},
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
    this.router.navigate(['../..'], {
      relativeTo: this.route
    })
    this.modalService.modalOn.set(false)
  }
    

    @Output() modalOn = new EventEmitter<boolean>();

    onDelete() {
      this.modalService.onDelete(this.service, +this.budgetKeyReference)
    }
    onSubmit() {
      console.log("this.form")
      console.log(this.form)
      if (this.type == "Edit") {
        this.modalService.onEdit(this.service, +this.budgetKeyReference, this.form.value)
      }
      if (this.type == 'Add') {
        this.modalService.onAdd(this.service, this.form.value)
      }
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
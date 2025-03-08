import { Component, computed, DoCheck, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
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
import { Button, ModalConfig } from '../../../shared-interfaces/modal-config.interface';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent, InputFieldComponent, ButtonComponent, DisplayMoney, ProgressBarComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {
 

  error = signal(false)
  data = signal(0)
  router = inject(Router)
  
  route = inject(ActivatedRoute)
  modalService = inject(ModalService)
  isString = isString
  isDeposit: boolean = true
  isEditPot: boolean = false
  form!: FormGroup
  modal!: {
    modal: ModalConfig
    item: BudgetDetail | Pot | null 
  }
  currentIndex!: number
  ngOnDestroy(): void {
    this.modalService.modalOn.set(false)
  }
  ngOnInit(): void {

  this.route.data.subscribe(({modal})=> {
    this.modal = modal
 
    this.currentIndex = +(this.router.url.match(/\d+/g)?.at(0) || '')
    if (this.modal.modal.key.includes('deposit')) {
      this.isEditPot = true
      this.isDeposit = true
    }
    else if (this.modal.modal.key.includes('withdraw')) {
      this.isEditPot = true
      this.isDeposit = false
    }
    else {
      this.isEditPot = false
    }
    
this.modal.modal.prompts = this.modal.modal.prompts.map((prompt) => {
 if (this.currentIndex) {


  if (prompt.formKey == 'category' || prompt.formKey == 'name') {
   
    if (this.modal.item) {
      return {
        ...prompt,
        placeholder: {title: this.modal.item.category}
      }
    }
    
  }
  if (prompt.formKey == 'theme') {
    return {
      ...prompt,
      placeholder: this.modalService.colors.filter((color: Dropdown) => {
        if (this.modal.item) {
          if (this.modal.item.theme.title == color.code) {
            return true
          }
        }
        
      return false;
      }).map((val) => {
        return {
          title: val.title,
          code: val.code
        }
      })[0]
    }
  }
}
  return prompt
})



let formParams = Object.create({})
for (let i = 0; i < this.modal.modal.prompts.length; i++) {
   
    let key = this.modal.modal.prompts[i].formKey
    let validations: ((control: AbstractControl) => any)[] = []
    if (this.modal.modal.prompts[i].validation.length > 0) {

  
     this.modal.modal.prompts[i].validation.forEach((validators => {
     
      if (this.modal.item && this.modal.item.amount) {
        if (this.modal.item.target && key == 'deposit') {
          validations.push(validators(0, +this.modal.item.target))
        }
        else if (this.modal.item.target && key == 'withdraw') {
          
          validations.push(validators(0, +this.modal.item.amount))
        }
        
      }
     if (key == 'spend' || key == 'category' || key == 'target') {
    
        
        validations.push(validators(0, 0))
      }
     

    }))
  }

    formParams[key] = new FormControl(null, [Validators.required, ...validations])
  
    
}
    this.form = new FormGroup(formParams)  
  })

}


  calculateAmount() {
    if (this.modal.item) {

   
    if (this.form.value.deposit == '' || this.form.value.withdraw == '' && this.modal.item.amount) {
      return '$'+ (this.modal.item.amount )
    }
  if (this.form.touched) {
      if (this.form.valid && this.modal.item.amount && this.modal.item.target) {
        if (+this.form.value.deposit + +this.modal.item.amount >= +this.modal.item.target) {
            return this.modal.item.target
        }
        else {
          if (+this.modal.item.amount - +this.form.value.withdraw < 0) {
            return '0'
          }
          else {
      
            if (this.form.value.deposit == '' || this.form.value.withdraw == '') {
              return this.isDeposit ? +this.form.value.deposit : +this.form.value.withdraw 
            }
            if (this.isDeposit) {
              return  isNaN(+this.modal.item.amount + +this.form.value.deposit) ? 'Invalid Amount' : +this.modal.item.amount + +this.form.value.deposit
            }
            else {
              
              if (isNaN(+this.modal.item.amount - +this.form.value.withdraw)) {
                return 'Invalid Amount'
              } 
              else {
               return +this.modal.item.amount - +this.form.value.withdraw
              } 
            }
          }
        }
       
      }
      else {
        return "Invalid Input"
      }
    
    }
 
  else {
    return this.modal.item.amount ? +this.modal.item.amount : ''
  }  
}
return ""
  }

 

  onExit() {

    if (this.router.url.includes('new')) {
      this.router.navigate(['..'], {
        relativeTo: this.route
      })
    }
    else {
      this.router.navigate(['../..'], {
        relativeTo: this.route
      })
    }
      
  }
    

    @Output() modalOn = new EventEmitter<boolean>();


    onSubmit(btn: Button) {
      btn.task(+this.currentIndex, this.form)
      this.onExit()
    }

    onAction(btn: Button) {

    }
    

    handleUserError() {

    }



    #mediaQueryService = inject(MediaQueryService)
           isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
           isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
           isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
    

}


function isString(value: any): value is string {
    return typeof value === "string"
}
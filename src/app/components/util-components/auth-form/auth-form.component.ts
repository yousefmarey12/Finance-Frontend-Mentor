import { Component, computed, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { CommonModule } from '@angular/common';
import { AuthForm } from '../../../shared-interfaces/auth-form.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SafeHtmlPipe } from '../../../shared-pipes/safe-html.pipe';
import { AuthService } from '../../../shared-services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputFieldComponent, CommonModule, SafeHtmlPipe, RouterLink],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent implements OnInit {
  router = inject(Router)
  route = inject(ActivatedRoute)
  navigateTo(str: string) {
    this.router.navigate([str])
  }
  @Input() authForm!: AuthForm
  form!: FormGroup
  auth = inject(AuthService)
  ngOnInit(): void {

   
    let formParams = Object.create({}) 
  
    
      

   
  this.authForm.inputs.forEach((field) => {
    formParams[field.formKey] = new FormControl(null, Validators.required)
  })
  this.form = new FormGroup(formParams)
  } 

  #mediaQueryService = inject(MediaQueryService)
  isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
  isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
  isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))

              submit() {
                console.log("hello")
              }
}

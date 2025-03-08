import { AfterRenderRef, AfterViewChecked, AfterViewInit, Component, computed, DoCheck, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { InputFieldComponent } from "../../util-components/input-field/input-field.component";
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../util-components/button/button.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from "../../util-components/auth-form/auth-form.component";
import { AuthForm } from '../../../shared-interfaces/auth-form.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, ButtonComponent, CommonModule, AuthFormComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit {
  route= inject(ActivatedRoute)
  ngOnInit(): void {
    this.route.data.subscribe(({authForm}) => {
      console.log("data")
      
      this.authForm = authForm
    })
  }

  authForm!: AuthForm

  calculateWidth() {
   return ((1120/1840) * this.img.nativeElement.clientHeight)
  }
  @ViewChild('img') img!: any

    showPassword: boolean = false
  #mediaQueryService = inject(MediaQueryService)
              isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
              isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
              isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    }

    
    submit() {

    }
}

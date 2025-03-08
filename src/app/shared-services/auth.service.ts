import { computed, inject, Injectable, Signal, signal } from "@angular/core";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { AuthForm } from "../shared-interfaces/auth-form.interface";
import { toSignal } from "@angular/core/rxjs-interop";
import { MediaQueryService } from "./media-query.service";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
@Injectable({
    providedIn: 'root'
})
export class AuthService {

   private firebaseConfig = {
    apiKey: environment.firebaseAPIKey,
    authDomain: "finance-fe-mentor.firebaseapp.com",
    projectId: "finance-fe-mentor",
    storageBucket: "finance-fe-mentor.firebasestorage.app",
    messagingSenderId: "234782610543",
    appId: "1:234782610543:web:07188d9f6bafc0e13aa99a",
    measurementId: "G-GTEP0SJ596",
    databaseURL: "https://finance-fe-mentor-default-rtdb.firebaseio.com/"

  };
  
  app = initializeApp(this.firebaseConfig)
   auth = getAuth(this.app)
    user = signal(null)
    uid = signal(null)
    router = inject(Router)
    svg =  computed(() => {
        if (this.showPassword()) {
          return `<svg  class="eye_icon"   xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" style="cursor: pointer;">
      <path d="M15.4569 8.17751C15.435 8.12813 14.9056 6.95375 13.7287 5.77688C12.1606 4.20875 10.18 3.38 7.99999 3.38C5.81999 3.38 3.83937 4.20875 2.27124 5.77688C1.09437 6.95375 0.562494 8.13 0.543119 8.17751C0.51469 8.24145 0.5 8.31065 0.5 8.38063C0.5 8.45061 0.51469 8.51981 0.543119 8.58375C0.564994 8.63313 1.09437 9.80688 2.27124 10.9838C3.83937 12.5513 5.81999 13.38 7.99999 13.38C10.18 13.38 12.1606 12.5513 13.7287 10.9838C14.9056 9.80688 15.435 8.63313 15.4569 8.58375C15.4853 8.51981 15.5 8.45061 15.5 8.38063C15.5 8.31065 15.4853 8.24145 15.4569 8.17751ZM7.99999 10.88C7.50554 10.88 7.02219 10.7334 6.61107 10.4587C6.19995 10.184 5.87951 9.79353 5.6903 9.33671C5.50108 8.8799 5.45157 8.37723 5.54803 7.89228C5.64449 7.40733 5.8826 6.96187 6.23223 6.61224C6.58186 6.26261 7.02732 6.0245 7.51227 5.92804C7.99722 5.83158 8.49989 5.88109 8.9567 6.07031C9.41352 6.25952 9.80396 6.57996 10.0787 6.99108C10.3534 7.4022 10.5 7.88555 10.5 8.38C10.5 9.04305 10.2366 9.67893 9.76776 10.1478C9.29892 10.6166 8.66304 10.88 7.99999 10.88Z" fill="#252623"/>
      </svg>`
        }
        else {
          return `<svg  class="eye_icon"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style="cursor: pointer;">
      <path d="M6.04249 3.61686C6.01297 3.58451 5.99246 3.54497 5.98301 3.5022C5.97357 3.45944 5.97553 3.41494 5.9887 3.37317C6.00186 3.33139 6.02577 3.29381 6.05803 3.26419C6.09028 3.23456 6.12976 3.21393 6.17249 3.20436C6.77196 3.06729 7.38506 2.99873 7.99999 2.99998C10.18 2.99998 12.1606 3.82873 13.7287 5.39686C14.9056 6.57373 15.435 7.74811 15.4569 7.79748C15.4853 7.86143 15.5 7.93063 15.5 8.00061C15.5 8.07059 15.4853 8.13979 15.4569 8.20373C15.435 8.25311 14.9056 9.42686 13.7287 10.6037C13.5504 10.7812 13.3673 10.9494 13.1794 11.1081C13.1299 11.1501 13.0661 11.1712 13.0014 11.167C12.9367 11.1628 12.8761 11.1336 12.8325 11.0856L6.04249 3.61686ZM13.37 13.1637C13.4151 13.2122 13.4501 13.2691 13.473 13.3311C13.496 13.3932 13.5064 13.4592 13.5036 13.5253C13.5008 13.5914 13.485 13.6563 13.4569 13.7162C13.4289 13.7762 13.3893 13.8299 13.3403 13.8744C13.2913 13.9189 13.234 13.9533 13.1717 13.9755C13.1094 13.9977 13.0432 14.0072 12.9772 14.0037C12.9111 14.0001 12.8464 13.9835 12.7868 13.9548C12.7272 13.926 12.6739 13.8857 12.63 13.8362L11.25 12.3206C10.2266 12.7733 9.11907 13.0048 7.99999 13C5.81999 13 3.83937 12.1712 2.27124 10.6037C1.09437 9.42686 0.562494 8.25311 0.543119 8.20373C0.51469 8.13979 0.5 8.07059 0.5 8.00061C0.5 7.93063 0.51469 7.86143 0.543119 7.79748C0.562494 7.74998 1.09437 6.57373 2.27124 5.39686C2.74142 4.92451 3.26591 4.50953 3.83374 4.16061L2.62999 2.83623C2.58491 2.7878 2.54989 2.73091 2.52696 2.66884C2.50402 2.60678 2.49364 2.54078 2.4964 2.47467C2.49916 2.40856 2.51502 2.34366 2.54305 2.28373C2.57108 2.22379 2.61072 2.17002 2.65969 2.12552C2.70865 2.08102 2.76597 2.04668 2.8283 2.02449C2.89063 2.00231 2.95675 1.99271 3.02282 1.99627C3.08889 1.99982 3.1536 2.01645 3.21319 2.0452C3.27279 2.07395 3.32608 2.11423 3.36999 2.16373L13.37 13.1637ZM9.27687 10.1481L5.98374 6.52311C5.64441 6.98804 5.47591 7.55583 5.50668 8.1306C5.53746 8.70538 5.76562 9.25192 6.15266 9.67797C6.5397 10.104 7.0619 10.3834 7.63109 10.4691C8.20028 10.5548 8.78159 10.4414 9.27687 10.1481Z" fill="#252623"/>
      </svg>` 
        }  
        })
    private email: string = ''
    private password: string = ''
     authFormLogin: AuthForm = {
        title: 'Login',
        buttons: [
            {
                title: 'Login',
                task: (index, form) => {
                    this.loginUser(form.value.email, form.value.password)
                }
            }
        ],
        inputs: [
            {
                label: 'Email',
                formKey: 'email',
                type: () => 'email'
            },
            {
                label: 'Password',
                formKey: 'password',
                type: () => this.showPassword() ? 'password' : 'text',
        icon: {
          svg: this.svg,
      onClick: () => {
        this.showPassword.update((val) => !val)
      }
    }
            }
        ],
        formDescription() {
            return `<p class="text-preset-4">Need to create an account? <span class="text-preset-4-bold signup">Sign Up</span></p>`
          }
    }
     authForm: AuthForm = {
        title: 'Sign Up',
        buttons: [{
          title: 'Create Account',
          task: (index, form) => {
            this.signupUser(form.value.email, form.value.password)
          }
        }],
        inputs: [{
          label: 'Name',
          formKey: 'name',
          type: () => 'text'
        },
      {
        label: 'Email',
        formKey: 'email',
        type: () => 'email',
      },
      {
        label: 'Create Password',
        formKey: 'password',
        type: () => this.showPassword() ? 'password' : 'text',
        icon: {
          svg: this.svg,
      onClick: () => {
        this.showPassword.update((val) => !val)
      }
    },
    description: 'Passwords must be at least 8 characters'
      }],
      formDescription() {
        return `<p class="text-preset-4">Already have an account? <span class="text-preset-4-bold signup">Login</span></p>`
      }
    }

    
    signup = true
    showPassword = signal(false)
    #mediaQueryService = inject(MediaQueryService)
                isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
                isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
                isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
  
    getAuthForm() {
        if (this.signup) {
            return this.authForm
        }
        else {
            return this.authFormLogin
        }
    }

    toggleAuthForm() {
       this.signup = !this.signup
    }

    

    getEmail() {
        return this.email
    }
    getPassword() {
        return this.password
    }
    setEmail(email: string) {
        this.email = email
    }
    setPassword(password: string) {
        this.password = password
    }

    loginUser(email: string, password: string) {
   
        signInWithEmailAndPassword(this.auth, email, password)
        .then(user => {
          
            this.user.update(() => <any>user.user)
            this.uid.update(() => <any>user.user.uid)
            this.router.navigate(['/overview'])
        
        })
    }
    signupUser(email: string, password: string) {
        
        createUserWithEmailAndPassword(this.auth, email, password)
        .then(user => {
            this.user.update(() => <any>user.user) 
            this.router.navigate(['/overview'])
        })
    }
}
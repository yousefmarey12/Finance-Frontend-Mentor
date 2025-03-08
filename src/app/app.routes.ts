import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Route, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { BillsPageComponent } from './components/pages/bills-page/bills-page.component';
import { BudgetsPageComponent } from './components/pages/budgets-page/budgets-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PotsPageComponent } from './components/pages/pots-page/pots-page.component';
import { TransactionsPageComponent } from './components/pages/transactions-page/transactions-page.component';
import { ModalComponent } from './components/util-components/modal/modal.component';
import { ModalService } from './shared-services/modal.service';
import { inject } from '@angular/core';
import { ModalConfig } from './shared-interfaces/modal-config.interface';
import { BudgetDetail } from './shared-interfaces/budget-detail.interface';
import { Pot } from './shared-interfaces/pot.interface';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from './shared-services/auth.service';
import { AuthPageComponent } from './components/pages/auth-page/auth-page.component';
import { AuthForm } from './shared-interfaces/auth-form.interface';

export const modalResolver: ResolveFn<{modal: ModalConfig, item: BudgetDetail | Pot | null}> = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let modalService = inject(ModalService)
    console.log("state.url")
    console.log("hellllooooo")
    console.log(state.url)
    let number = state.url.match(/\d+/g)
    console.log("state.url.includes('pot')")
    console.log(state.url.includes('pot'))
    console.log(state.url.includes('new'))
    console.log(state.url.includes('pot'))
    let result2;
    if (state.url.includes('pot')) {
        if (state.url.includes('new')) {
            console.log("ayoooo does this even run?")
            result2 = await modalService.getConfig('pot-add', null)
        }
        else if (state.url.includes('edit') && number) {
            result2 = await modalService.getConfig('pot-edit', +number[0])
        }
        else if (state.url.includes('delete') && number) {
            result2 = await modalService.getConfig('pot-delete', +number[0])
        }
        else if (state.url.includes('deposit') && number) {
            result2 = await modalService.getConfig('pot-deposit', +number[0])
        }
        else {
            if (number ) {
                result2 = await modalService.getConfig('pot-withdraw', +number[0])
            }
            result2 = await modalService.getConfig('budget-add', null)
        }
    }
    else {
        if (state.url.includes('edit') && number) {
            result2 = await modalService.getConfig('budget-edit', +number[0])
        }
        else if (state.url.includes('new')) {
            result2 = await modalService.getConfig('budget-add', null)
        }
        else {
            if (number) {
                result2 = await modalService.getConfig('budget-delete', +number[0])
            }
            result2 = await modalService.getConfig('budget-add', null)
        }
    }
    return result2
}



const canActivate: CanActivateFn = (  route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => {
    let modalOn = inject(ModalService).modalOn
    let authService = inject(AuthService)
    let router = inject(Router)
    console.log(modalOn())
    if (modalOn() || !authService.user()) {
        return router.createUrlTree(['/signup'])
    }
    return true
}
export const routes: Route[] = [

    {
        path: '',
        redirectTo: '/signup',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: AuthPageComponent,
        resolve: {authForm: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
           return inject(AuthService).authForm
        }}
    },
    {
        path: 'login',
        component: AuthPageComponent,
        resolve: {authForm: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            return inject(AuthService).authFormLogin
         }}
    },
    {
        path: 'overview',
        component: HomeComponent,
        canActivate: [canActivate]
        
    },
    {
        path: 'transactions',
        component: TransactionsPageComponent,
        canActivate: [canActivate]
    },
    {
        path: 'budgets',
        component: BudgetsPageComponent,
        children: [
            {
                path: 'new',
                component: ModalComponent,
                resolve: {modal: modalResolver}
            },
            {
                path: 'edit/:id',
                component: ModalComponent,
                resolve: {modal: modalResolver}
            },
            {
                path: 'delete/:id',
                component: ModalComponent,
                resolve: {modal: modalResolver}
            }
        ],
        canActivate: [canActivate]
    },

    {
        path: 'pots',
     component: PotsPageComponent,
        children: [
            {
                path: 'new',
                component: ModalComponent, 
                resolve: {modal: modalResolver}
            },
            {
                path: 'edit/:id',
                component: ModalComponent,
                resolve: {modal: modalResolver}
                
            },
            {
                path: 'delete/:id',
                component: ModalComponent,
                resolve: {modal: modalResolver}
            },
            {
                path: 'deposit/:id',
                component: ModalComponent,
                resolve: {modal: modalResolver}
            },
            {
                path: 'withdraw/:id',
                component: ModalComponent,
                resolve: {modal: modalResolver}
            }
        ],
        canActivate: [canActivate]
    },
    {
        path: 'bills',
        component: BillsPageComponent,
        canActivate: [canActivate]
    },
    {path: '**', redirectTo: '/signup',}
]

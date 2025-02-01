import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Route, RouterStateSnapshot, Routes } from '@angular/router';
import { BillsPageComponent } from './pages/bills-page/bills-page.component';
import { BudgetsPageComponent } from './pages/budgets-page/budgets-page.component';
import { HomeComponent } from './pages/home/home.component';
import { PotsPageComponent } from './pages/pots-page/pots-page.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { ModalComponent } from './components/large/modal/modal.component';
import { ModalService } from './shared-services/modal.service';
import { inject } from '@angular/core';
const canActivate: CanActivateFn = (  route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => {
    let modalOn = inject(ModalService).modalOn
    if (modalOn()) {
        return false
    }
    return true
}
export const routes: Route[] = [
    {
        path: '',
        redirectTo: '/overview',
        pathMatch: 'full'
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
                component: ModalComponent
            },
            {
                path: 'edit/:id',
                component: ModalComponent
            },
            {
                path: 'delete/:id',
                component: ModalComponent
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
            },
            {
                path: 'edit/:id',
                component: ModalComponent
            },
            {
                path: 'delete/:id',
                component: ModalComponent
            }
        ],
        canActivate: [canActivate]
    },
    {
        path: 'bills',
        component: BillsPageComponent,
        canActivate: [canActivate]
    }
]

import { Route, Routes } from '@angular/router';
import { BillsPageComponent } from './pages/bills-page/bills-page.component';
import { BudgetsPageComponent } from './pages/budgets-page/budgets-page.component';
import { HomeComponent } from './pages/home/home.component';
import { PotsPageComponent } from './pages/pots-page/pots-page.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';

export const routes: Route[] = [
    {
        path: 'overview',
        component: HomeComponent
    },
    {
        path: 'transactions',
        component: TransactionsPageComponent
    },
    {
        path: 'budgets',
        component: BudgetsPageComponent
    },
    {
        path: 'pots',
        component: PotsPageComponent
    },
    {
        path: 'bills',
        component: BillsPageComponent
    }
]

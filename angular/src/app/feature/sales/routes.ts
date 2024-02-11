import { Routes } from '@angular/router';
import Sales from './sales.component';

export default [
    { path: '', component: Sales },
    { path: 'subscriptions', component: Sales, loadChildren: async () => await import('./subscriptions/routes') },
    { path: 'invoices', component: Sales, loadChildren: async () => await import('./invoices/routes') },
    { path: 'customers', component: Sales, loadChildren: async () => await import('./customers/routes') },
    { path: 'deposits', component: Sales, loadChildren: async () => await import('./deposits/routes') },
] satisfies Routes;
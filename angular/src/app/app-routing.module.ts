import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { HoverPreloadStrategy } from './core/strategy/hover-strategy';
// import { provideTrpcClient } from './core/utilities/trpc/client';
// import superjson from 'superjson';

const routes: Routes = [
  { path: '', loadChildren: async () => await import('./feature/dashboard/routes') },
  { path: 'accounts', loadChildren: async () => await import('./feature/accounts/routes') },
  { path: 'sales', loadChildren: async () => await import('./feature/sales/routes') },
  { path: 'expenses', loadChildren: async () => await import('./feature/expenses/routes') },
  { path: 'reports', loadChildren: async () => await import('./feature/reports/routes') },
];

@NgModule({
  providers: [
    // provideTrpcClient('invoices', { transformer: superjson }),
    provideRouter(routes, withComponentInputBinding(), withPreloading(HoverPreloadStrategy)),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

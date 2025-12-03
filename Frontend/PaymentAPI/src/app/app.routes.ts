import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { DashboardComponent } from './features/Merchant/myaccount/myaccount';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { authGuard, adminGuard, merchantGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // ---------------------------------------------------------
  // DEFAULT REDIRECT (must be FIRST)
  // ---------------------------------------------------------
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // ---------------------------------------------------------
  // AUTHENTICATION ROUTES
  // ---------------------------------------------------------
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },

  // ---------------------------------------------------------
  // MERCHANT PORTAL ROUTES
  // ---------------------------------------------------------
  {
    path: 'merchant',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'transactions/:accountId',
        loadComponent: () =>
          import('./features/Merchant/transactions/transactions')
            .then(m => m.Transactions)
      }
    ]
  },

  // ---------------------------------------------------------
  // ADMIN PORTAL ROUTES
  // ---------------------------------------------------------
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'accounts/:MerchantId',
        loadComponent: () =>
          import('./features/admin/accounts/accounts')
            .then(m => m.Accounts)
      },
      {
        path: 'transactions/:accountId',
        loadComponent: () =>
          import('./features/Merchant/transactions/transactions')
            .then(m => m.Transactions)
      },
      {
        path: 'summary/:MerchantId',
        loadComponent: () =>
          import('./features/admin/merchant-summary/merchant-summary')
            .then(m => m.MerchantSummary)
      },
      {
        path: 'refund-approvals',
        loadComponent: () =>
          import('./features/admin/refund/refund')
            .then(m => m.Refund)
      }
    ]
  },

  // ---------------------------------------------------------
  // WILDCARD (handles unknown routes)
  // ---------------------------------------------------------
  {
  path: '**',
  redirectTo: 'login'
  }
];

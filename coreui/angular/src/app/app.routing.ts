import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './auth.guard';
import { ForgetpasswordComponent } from './views/forgetpassword/forgetpassword.component';
import {VerfiyComponent} from './views/verfiy/verfiy.component';
import { SettingsComponent } from './containers';
import { OrganizationSettingsComponent } from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
    data: {
      title: 'Forget Password'
    }
  },
  {
    path: 'verify',
    component: VerfiyComponent,
    data: {
      title: 'Verify Password'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],

    children: [

      {
        path: '',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },

      {
        path: 'forget_password',
        loadChildren: () => import('./views/forget-password/forget-password.module').then(m => m.ForgetModule)
      },

      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule)
      },










    ]
  },

  {
    path: 'orgsettings',
    component: OrganizationSettingsComponent,
    canActivate: [AuthGuard],

    children: [

      {
        path: '',
        loadChildren: () => import('./views/org-profile/org-profile.module').then(m => m.OrgProfileModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'warehouse',
        loadChildren: () => import('./views/warehouse/warehouse.module').then(m => m.WarehouseModule)
      },

      {
        path: 'taxes',
        loadChildren: () => import('./views/taxes/taxes.module').then(m => m.TaxesModule)
      },

      {
        path: 'databackup',
        loadChildren: () => import('./views/backup-data/backup-data.module').then(m => m.BackupDataModule)
      },

      {
        path: 'onlinePayments',
        loadChildren: () => import('./views/online-payments/online-payments.module').then(m => m.OnlinePaymentsModule)
      },

      {
        path: 'smsintegration',
        loadChildren: () => import('./views/sms-integration/sms-integration.module').then(m => m.SmsIntegrationModule)
      },










    ]
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      // },


      // {
      //   path: 'customers',
      //   loadChildren: () => import('./views/customer/customer.module').then(m => m.CustomerModule)
      // },
      {
        path: 'customers', canLoad: [AuthGuard],
        loadChildren: () => import('./views/customers/customers.module').then(m => m.CustomersModule)
      },
      {
        path: 'bill',
        loadChildren: () => import('./views/bills/bills.module').then(m => m.BillsModule)
      },

      {
        path: 'invoice',
        loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'deliverychallan',
        loadChildren: () => import('./views/delivery-challan/delivery-challan.module').then(m => m.DeliveryChallanModule)
      },
      {
        path: 'salesorder',
        loadChildren: () => import('./views/sales-order/sales-order.module').then(m => m.SalesOrderModule)
      },
      {
        path: 'suplier',
        loadChildren: () => import('./views/suplier/suplier.module').then(m => m.SuplierModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'purchase',
        loadChildren: () => import('./views/purchase/purchase.module').then(m => m.PurchaseModule)
      },
      {
        path: 'stocks',
        loadChildren: () => import('./views/stock-register/stock-register.module').then(m => m.StockRegisterModule)
      },


      // {
      //   path: 'buttons',
      //   loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      // },

      // {
      //   path: 'charts',
      //   loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      // },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      // {
      //   path: 'icons',
      //   loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      // },
      // {
      //   path: 'theme',
      //   loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      // },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes , { preloadingStrategy: PreloadAllModules })  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

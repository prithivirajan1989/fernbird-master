import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserIdleModule } from 'angular-user-idle';
import { ModalModule } from 'ngx-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { OrganizationSettingsComponent } from './containers';
import { SettingsComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  SettingsComponent,
  OrganizationSettingsComponent,
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth.guard';
import { ValidateService } from './auth/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ForgetpasswordComponent } from './views/forgetpassword/forgetpassword.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { VerfiyComponent } from './views/verfiy/verfiy.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreatorInterceptorService } from './auth/cretator-interseptor.service';
import { AuthInterceptor } from './auth/auth-interseptor.service';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    UserIdleModule.forRoot({ idle: 600, timeout: 600, ping: 600 }),
    ModalModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    MatDialogModule,
    MatProgressButtonsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    TooltipModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    InternationalPhoneNumberModule,
    FlashMessagesModule.forRoot(),
    AlertModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    VerfiyComponent
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CreatorInterceptorService,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { LogoComponent } from './logo.component';
import { LogoRoutingModule } from './logo-routing.module';
import { CommonModule } from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

@NgModule({
  imports: [
    LogoRoutingModule,
    CommonModule,
    FormsModule,
    InternationalPhoneNumberModule,
    ModalModule.forRoot()
  ],
  declarations: [ LogoComponent ]
})
export class LogoModule { }

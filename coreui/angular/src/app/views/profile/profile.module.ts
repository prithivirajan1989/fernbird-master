import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CommonModule } from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LogoComponent } from '../logo/logo.component';



@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    MatProgressBarModule,
    ModalModule.forRoot()
  ],
  declarations: [ ProfileComponent, LogoComponent ]
})
export class ProfileModule { }

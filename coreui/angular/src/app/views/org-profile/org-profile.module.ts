import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrgProfileComponent } from './org-profile.component';
import { OrgProfileRoutingModule } from './org-profile-routing.module';
import {ModalModule} from 'ngx-bootstrap';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
@NgModule({
  declarations: [OrgProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    MatProgressBarModule,
    ModalModule.forRoot(),
    OrgProfileRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  
  ],
  bootstrap: [OrgProfileComponent]
})




export class OrgProfileModule { }

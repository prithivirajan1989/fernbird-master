import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AdduserComponent } from './add-user/adduser.component';
import { EditUserComponent } from './edit-user/useraccess.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [ UsersComponent,  AdduserComponent, EditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatProgressBarModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    BsDropdownModule,
    FilterPipeModule,

    ModalModule.forRoot()
  ],
 
})
export class UsersModule { }

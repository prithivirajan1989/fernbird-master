import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetComponent } from './forget-password.component';
import { ForgetRoutingModule } from './forget-password-routing.module';


@NgModule({
  declarations: [ForgetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ForgetRoutingModule,
  ],
  bootstrap: [ForgetComponent]
})
export class ForgetModule { }

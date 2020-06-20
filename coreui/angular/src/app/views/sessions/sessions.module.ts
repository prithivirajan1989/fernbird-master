import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SessionsComponent } from './sessions.component';
import { SessionsRoutingModule } from './sessions-routing.module';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [SessionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SessionsRoutingModule,
    DeviceDetectorModule.forRoot()
  ],
  bootstrap: [SessionsComponent]
})


export class SessionsModule { }

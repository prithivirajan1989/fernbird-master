import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap";
import { TooltipModule } from "ng2-tooltip-directive";
import { SmsIntegrationComponent } from './sms-integration.component';
import { SmsRoutingModule } from './sms-routing.module';
@NgModule({
  declarations: [SmsIntegrationComponent],
  imports: [
    CommonModule,
    SmsRoutingModule,
    TooltipModule,
    ModalModule.forRoot(),
  ],
})
export class SmsIntegrationModule { }

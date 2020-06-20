import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap";
import { TooltipModule } from "ng2-tooltip-directive";
import { BackupDataComponent } from "./backup-data.component";
import { BackupRoutingModule } from "./backup-routing.module";
@NgModule({
  declarations: [BackupDataComponent],
  imports: [
    CommonModule,
    BackupRoutingModule,
    TooltipModule,
    ModalModule.forRoot(),
  ],
})
export class BackupDataModule {}

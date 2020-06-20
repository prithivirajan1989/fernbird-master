import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatesuplierComponent } from './createsuplier/createsuplier.component';
import { EditsuplierComponent } from './editsuplier/editsuplier.component';
import { SuplierRoutingModule } from './suplier-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuplierComponent } from './suplier.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import {ModalModule} from 'ngx-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer'

@NgModule({
  declarations: [SuplierComponent,CreatesuplierComponent, EditsuplierComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    SuplierRoutingModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FilterPipeModule,
    NgxSpinnerModule,
    NgxPaginationModule,

  ]
})
export class SuplierModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuplierComponent } from './suplier.component';
import { CreatesuplierComponent } from './createsuplier/createsuplier.component';
import { EditsuplierComponent } from './editsuplier/editsuplier.component';


const routes: Routes = [
  {
    path: '',
    component: SuplierComponent,
    data: {
      title: 'Suplier'
    }
  },
  { path: 'add', component: CreatesuplierComponent, data: {
    title: 'Add Suplier'
  } },
  { path: 'edit/:id', component: EditsuplierComponent, data: {
    title: 'Update Suplier'
  } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SuplierRoutingModule {}

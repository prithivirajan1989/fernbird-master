import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackupDataComponent } from './backup-data.component';

const routes: Routes = [
  {
    path: '',
    component: BackupDataComponent,
    data: {
      title: 'Data Backup'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackupRoutingModule {}



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkreportPage } from './workreport.page';

const routes: Routes = [
  {
    path: '',
    component: WorkreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkreportPageRoutingModule {}

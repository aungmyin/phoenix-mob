import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkreportdetailPage } from './workreportdetail.page';

const routes: Routes = [
  {
    path: '',
    component: WorkreportdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkreportdetailPageRoutingModule {}

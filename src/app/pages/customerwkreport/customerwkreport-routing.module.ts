import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerwkreportPage } from './customerwkreport.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerwkreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerwkreportPageRoutingModule {}

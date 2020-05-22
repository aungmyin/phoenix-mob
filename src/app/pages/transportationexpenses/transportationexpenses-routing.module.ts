import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportationexpensesPage } from './transportationexpenses.page';

const routes: Routes = [
  {
    path: '',
    component: TransportationexpensesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportationexpensesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportationexpensesPageRoutingModule } from './transportationexpenses-routing.module';

import { TransportationexpensesPage } from './transportationexpenses.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportationexpensesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TransportationexpensesPage]
})
export class TransportationexpensesPageModule {}

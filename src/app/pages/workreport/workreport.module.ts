import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkreportPageRoutingModule } from './workreport-routing.module';

import { WorkreportPage } from './workreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkreportPageRoutingModule
  ],
  declarations: [WorkreportPage]
})
export class WorkreportPageModule {}

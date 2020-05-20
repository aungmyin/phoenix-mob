import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkreportdetailPageRoutingModule } from './workreportdetail-routing.module';

import { WorkreportdetailPage } from './workreportdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkreportdetailPageRoutingModule
  ],
  declarations: [WorkreportdetailPage]
})
export class WorkreportdetailPageModule {}

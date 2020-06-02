import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkreportdetailPageRoutingModule } from './workreportdetail-routing.module';

import { WorkreportdetailPage } from './workreportdetail.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkreportdetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WorkreportdetailPage]
})
export class WorkreportdetailPageModule {}

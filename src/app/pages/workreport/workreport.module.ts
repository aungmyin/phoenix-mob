import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkreportPageRoutingModule } from './workreport-routing.module';

import { WorkreportPage } from './workreport.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkreportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WorkreportPage ]
})
export class WorkreportPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerwkreportPageRoutingModule } from './customerwkreport-routing.module';

import { CustomerwkreportPage } from './customerwkreport.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerwkreportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CustomerwkreportPage]
})
export class CustomerwkreportPageModule {}

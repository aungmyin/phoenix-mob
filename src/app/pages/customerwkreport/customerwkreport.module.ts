import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerwkreportPageRoutingModule } from './customerwkreport-routing.module';

import { CustomerwkreportPage } from './customerwkreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerwkreportPageRoutingModule
  ],
  declarations: [CustomerwkreportPage]
})
export class CustomerwkreportPageModule {}

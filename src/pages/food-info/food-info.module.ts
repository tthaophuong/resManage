import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodInfoPage } from './food-info';

@NgModule({
  declarations: [
    FoodInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodInfoPage),
  ],
})
export class FoodInfoPageModule {}

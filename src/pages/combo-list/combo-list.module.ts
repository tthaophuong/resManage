import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComboListPage } from './combo-list';

@NgModule({
  declarations: [
    ComboListPage,
  ],
  imports: [
    IonicPageModule.forChild(ComboListPage),
  ],
})
export class ComboListPageModule {}

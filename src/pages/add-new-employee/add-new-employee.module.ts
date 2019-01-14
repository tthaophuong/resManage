import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewEmployeePage } from './add-new-employee';

@NgModule({
  declarations: [
    AddNewEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewEmployeePage),
  ],
})
export class AddNewEmployeePageModule {}

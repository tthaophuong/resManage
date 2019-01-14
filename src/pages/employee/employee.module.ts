import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeePage } from './employee';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeePage),
    PipesModule
  ],
})
export class EmployeePageModule {}

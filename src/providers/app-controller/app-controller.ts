import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Calendar } from './calendar';

/*
  Generated class for the AppControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppControllerProvider {
  // showPage(arg0: string): any {
  //   throw new Error("Method not implemented.");
  // }
  // showModel(arg0: string): any {
  //   throw new Error("Method not implemented.");
  // }

  constructor(
    public mModalController: ModalController,
    // public navCtrl: NavController,
    public http: HttpClient) {
    console.log('Hello AppControllerProvider Provider');
  }


  public showModal(page: string, params?: any) {
    let modal = this.mModalController.create(page, params ? params : null);
    modal.present();
  }
  public _createCalendar(): Calendar{
    let today = new Date();
    return new Calendar(today.getMonth()+ 1,today.getFullYear());
  } 
}

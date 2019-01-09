import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mModalController: any;
  // modalCtrls: any;
  constructor(public navCtrl: NavController, public modalCtrls: ModalController) {

  }
  // openModal() {
  //   let modal = this.modalCtrls.create("LoginPage");
  //   modal.present();
  // }
  openModal(){
    this.mModalController.showModel("LoginPage")
  }
}


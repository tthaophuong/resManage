import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the ComboListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "ComboListPage",
  segment: "combo-list"
})
@Component({
  selector: 'page-combo-list',
  templateUrl: 'combo-list.html',
})
export class ComboListPage {

  constructor(public navCtrl: NavController, 
    public mAppModule: AppControllerProvider,
    public navParams: NavParams) {  }
  moveCombo() {
    this.mAppModule.showModal("ComboPage");
  }
  dismiss(){
    this.navCtrl.pop();  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComboListPage');
  }
combos=[{
  namec: "1. Salad ",
  linkc: "x ",
  quantityc: "1",
  removec:"x"
},

]
}

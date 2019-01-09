import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FoodInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: "FoodInfoPage",
    segment: "food-info"
  }
)
@Component({
  selector: 'page-food-info',
  templateUrl: 'food-info.html',
})
export class FoodInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodInfoPage');
  }
  closeCombo(){
    this.navCtrl.pop();
  }
}

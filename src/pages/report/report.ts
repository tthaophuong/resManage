import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Products } from '../../providers/class/Products';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "ReportPage",
  segment: "report"
})
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  mType: number = 1;
  items: Array<Products> = [];

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    if(!this.mAppModule.userIsLogin){
      this.navCtrl.setRoot("LoginPage");
      return;
    }
    this.items = RestaurantManager.getInstance().mTopProducts;
  }

}

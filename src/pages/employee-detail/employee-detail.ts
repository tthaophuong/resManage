import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EmployeeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: "EmployeeDetailPage",
    segment: "employee-detail"
  }
)
@Component({
  selector: 'page-employee-detail',
  templateUrl: 'employee-detail.html',
})
export class EmployeeDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  hideDetail(){
    this.navCtrl.pop(); 

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDetailPage');
  }

}

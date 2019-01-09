import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ScheduleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"ScheduleDetailPage",
  segment:"schedule-detail"
})
@Component({
  selector: 'page-schedule-detail',
  templateUrl: 'schedule-detail.html',
})
export class ScheduleDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCrl: ViewController) {
  }
  dismiss(){
this.viewCrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleDetailPage');
  }

}

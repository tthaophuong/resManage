import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "SchedulePage",
  segment: "schedule",
})
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modCtrl: ModalController) {
  }
  createSchedule() {
    let schedule = this.modCtrl.create("ScheduleDetailPage")
    schedule.present();
  }
  items = [
    {
      stt: "1",
      id: "1",
      name: "ca sáng",
      timeStart: "8:00",
      timeEnd: "17:00",
      statusSch: "Đang hoạt động"
    },
    {
      stt: "1",
      id: "1",
      name: "ca sáng",
      timeStart: "8:00",
      timeEnd: "17:00",
      statusSch: "Đang hoạt động"
    },
    {
      stt: "1",
      id: "1",
      name: "ca chiều",
      timeStart: "8:00",
      timeEnd: "17:00",
      statusSch: "Đang hoạt động"
    },
    {
      stt: "1",
      id: "1",
      name: "ca sáng",
      timeStart: "8:00",
      timeEnd: "17:00",
      statusSch: "Đang hoạt động"
    },
  ]
  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

}

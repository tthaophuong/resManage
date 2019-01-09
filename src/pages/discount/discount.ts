import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Calendar, Day } from '../../providers//app-controller/calendar';
import { Untils } from '../../providers/app-controller/untils';

/**
 * Generated class for the DiscountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "DiscountPage",
  segment: "discount"
}
)
@Component({
  selector: 'page-discount',
  templateUrl: 'discount.html',
})
export class DiscountPage {
  dayofweeks = ["M", "T", "W", "T", "F", "S", "S"];
  months = [];
  numberSelected: number = 5;
  calendar: Calendar;
  date: string = "--Date--";
  today: Date;
  times: Array<string> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public mAppModule: AppControllerProvider,
    public mModalController: ModalController,
    public mAppController: AppControllerProvider,
    public modCtrl: ModalController) {
      this.calendar = new Calendar();
      this.calendar = this.mAppController._createCalendar();
      this.today = new Date();
      this.numberSelected = this.today.getDate();
      this.date = Untils.convertDateString(this.calendar.year, this.calendar.month, this.numberSelected);
  }

  openDiscount(){
    let modal = this.modCtrl.create("ComboListPage");
    modal.present();
  };
  changeNumber(day: Day) {
    this.isShowDate = false;
    if (day != null && day.dayNumber >= this.today.getDate()) {
      this.numberSelected = day.dayNumber;
      this.date = Untils.convertDateString(this.calendar.year, this.calendar.month, this.numberSelected);
      if (this.numberSelected == this.today.getDate()) {
        this._createTimeListToDay();
      } else {
        this.creatTimeList(9, 21);
      }
    }
  }
  _createTimeListToDay() {
    let min = 9;
    let max = 21;
    let now = new Date();
    if (now.getHours() > min) {
      min = now.getHours();
    }
    this.creatTimeList(min, max, now);
  }

  creatTimeList(min, max, now?: Date) {
    this.times = [];
    for (let i = min; i <= max; i++) {
      if (!now && i == min) {
        this.times.push(i + "h00");
        this.times.push(i + "h30");
      }
      if (now && i == min && now.getMinutes() < 30) {
        this.times.push(min + "h30");
      }
      if (i > min && i < max) {
        this.times.push(i + "h00");
        this.times.push(i + "h30");
      }
      if (i == max) {
        this.times.push(i + "h00");
      }
    }
  }

  isShowDate: boolean = false;
  /**Hiển thị dropdown ngày tháng */
  showDetail(){
    this.isShowDate = !this.isShowDate;
    this.isShowTime = false;
  }
  isShowTime: boolean = false;
  /**Hiển thị dropdown chọn giờ */
  showTime(){
    this.isShowTime = !this.isShowTime;
    this.isShowDate = false;
    if(this.times.length == 0 && this.isShowTime){
      this.isShowTime = false;
    }
  }
  moveCombo() {
    this.mAppModule.showModal("ComboListPage");
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad DiscountPage');
    console.log('ionViewDidLoad CalendarPage');
    this._createTimeListToDay();
  }

  createTimeListToDay() {
    let min = 9;
    let max = 21;
    let now = new Date();
    if (now.getHours() > min) {
      min = now.getHours();
    }
    this.creatTimeList(min, max, now);
  }

  time: string = "Time";
  seclecTime(time) {
    this.isShowTime = false;
    this.time = time;
    // this.checkFullOption();
  }
  items = [
    {
      stt: "1",
      code: "1",
      name: "Salad ",
      startDate: "09/09/2018",
      endDate: "09/09/2018",
      describle: "Đang sử dụng",
    },
    {
      stt: "1",
      code: "1",
      name: "Salad ",
      startDate: "09/09/2018",
      endDate: "09/09/2018",
      describle: "Đang sử dụng",
    },
  ];
}

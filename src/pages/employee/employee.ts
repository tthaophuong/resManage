import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

/**
 * Generated class for the EmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: "EmployeePage",
    segment: "employee"
  }
)
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {
  modalCtrls: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController,
    public modCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeePage');
  }
  openModel() {
    let modal = this.modCtrl.create("EmployeeDetailPage");
    modal.present();
  }
  doPrompt() {
    let emp = this.modCtrl.create("EmployeeDetailPage")
    emp.present();
  //   let prompt = this.alertCtrl.create({
  //     title: 'Thêm tài khoản',
  //     inputs: [
  //       {
  //         name: 'Username',
  //         placeholder: 'Username'
  //       },
  //       {
  //         name: 'Password',
  //         placeholder: 'Password'
  //       },
  //     ],

      
  //     buttons: [
  //       {
  //         text: 'Hủy',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Lưu',
  //         handler: data => {
  //           console.log('Saved clicked');
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  }

  items = [
    {
      stt: "1",
      id: "1",
      name: "Smith",
      birth: "2000/2/2",
      phone: "23425235",
      time: "12:00",
      status: "đang hoạt động",
    },
    {
      stt: "1",
      id: "1",
      name: "Smith",
      birth: "2000/2/2",
      phone: "23425235",
      time: "12:00",
      status: "đang hoạt động",
    },
    {
      stt: "1",
      id: "1",
      name: "Smith",
      birth: "2000/2/2",
      phone: "23425235",
      time: "12:00",
      status: "đang hoạt động",
    },
    {
      stt: "1",
      id: "1",
      name: "Smith",
      birth: "2000/2/2",
      phone: "23425235",
      time: "12:00",
      status: "đang hoạt động",
    },
    {
      stt: "1",
      id: "1",
      name: "Smith",
      birth: "2000/2/2",
      phone: "23425235",
      time: "12:00",
      status: "đang hoạt động",
    },
  ]
}

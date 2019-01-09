import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"OrderPage",
  segment:"order"
}) 
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  constructor(public navCtrl: NavController, 
    public mAppModule: AppControllerProvider,
    public navParams: NavParams) {
  }
  moveOrderDetail(){
    this.mAppModule.showModal("OrderDetailPage")
  }
  moveNewOrder(){
    this.mAppModule.showModal("ComboListPage")
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }
  items=[
    {
      orderID: "1",
      table: "1",
      nameID:"1",
      name:"Smith",
      startTime:"12:00",
      endTime:"12:00",
      date:"2018/12/12",
      status:"đang hoạt động",
      money:"200000"
    },
    {
      orderID: "1",
      table: "1",
      nameID:"1",
      name:"Smith",
      startTime:"12:00",
      endTime:"12:00",
      date:"2018/12/12",
      status:"đang hoạt động",
      money:"200000"
    },
    {
      orderID: "1",
      table: "1",
      nameID:"1",
      name:"Smith",
      startTime:"12:00",
      endTime:"12:00",
      date:"2018/12/12",
      status:"đang hoạt động",
      money:"200000"
    },
    {
      orderID: "1",
      table: "1",
      nameID:"1",
      name:"Smith",
      startTime:"12:00",
      endTime:"12:00",
      date:"2018/12/12",
      status:"đang hoạt động",
      money:"200000"
    },
    {
      orderID: "1",
      table: "1",
      nameID:"1",
      name:"Smith",
      startTime:"12:00",
      endTime:"12:00",
      date:"2018/12/12",
      status:"đang hoạt động",
      money:"200000"
    },
  ]
}

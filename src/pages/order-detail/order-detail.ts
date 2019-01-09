import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "OrderDetailPage",
  segment: "order-detail"
})
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  closeCombo() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }
  orders = [{
    orderID: "1",
    tableID: "1",
    food: "salad",
    quantity: "1",
    unit: "đĩa",
    cost: "5$",
    discount: "",
    total: "5$",
  },
  {
    orderID: "1",
    tableID: "1",
    food: "salad",
    quantity: "1",
    unit: "đĩa",
    cost: "5$",
    discount: "",
    total: "5$",
  },
  {
    orderID: "1",
    tableID: "1",
    food: "salad",
    quantity: "1",
    unit: "đĩa",
    cost: "5$",
    discount: "",
    total: "5$",
  },
  ]
}

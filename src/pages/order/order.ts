import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Orders } from '../../providers/class/Orders';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { OrderManager } from '../../providers/app-controller/OrderManager';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "OrderPage",
  segment: "order"
})
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  mType: number = 1;

  mOders: Array<Orders> = [];
  mAllOrders: Array<Orders> = [];

  mFilterId: number = 1;

  constructor(public navCtrl: NavController,
    public mAppModule: AppControllerProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    if (!this.mAppModule.userIsLogin) {
      this.navCtrl.setRoot("LoginPage");
      return;
    }

    this.mAppModule._loadAppConfig().then(() => {
      RestaurantSFSConnector.getInstance().addListener("OrderPage", response => {
        this.onExtension(response);
      })
    })

    RestaurantSFSConnector.getInstance().getListOrder(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
  }

  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("OrderPage");
  }

  onExtension(response) {
    this.mAppModule.hideLoading();

    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd, params);
      if (cmd == RestaurantCMD.GET_LIST_ORDER_TODAY) {
        this.onResponseGetListOrder(database);
      }
    } else {
      this.mAppModule.showParamsMessage(params);
    }
  }

  onResponseGetListOrder(params) {
    let array = params.array;
    OrderManager.getInstance().onResponseAllOrders(RestaurantClient.getInstance().onParseListOrder(array));
    this.mAllOrders = OrderManager.getInstance().getAllOrders();

    let tables = RestaurantManager.getInstance().getTables();
    this.mAllOrders.forEach(element => {
      let index = tables.findIndex(table => {
        return table.getTable_id() == element.getTable_id();
      })

      if (index > -1) {
        element.getTables().fromObject(tables[index]);
      }
    });

    this.onLoadOrdersByFilter();
  }

  onLoadOrdersByFilter() {
    this.mOders = this.mAllOrders.filter(o => {
      return o.getStatus() == this.mFilterId;
    })
  }

  items = [
    {
      orderID: "1",
      table: "1",
      nameID: "1",
      name: "Smith",
      startTime: "12:00",
      endTime: "12:00",
      date: "2018/12/12",
      status: "đang hoạt động",
      money: "200000"
    },
    {
      orderID: "1",
      table: "1",
      nameID: "1",
      name: "Smith",
      startTime: "12:00",
      endTime: "12:00",
      date: "2018/12/12",
      status: "đang hoạt động",
      money: "200000"
    },
    {
      orderID: "1",
      table: "1",
      nameID: "1",
      name: "Smith",
      startTime: "12:00",
      endTime: "12:00",
      date: "2018/12/12",
      status: "đang hoạt động",
      money: "200000"
    },
    {
      orderID: "1",
      table: "1",
      nameID: "1",
      name: "Smith",
      startTime: "12:00",
      endTime: "12:00",
      date: "2018/12/12",
      status: "đang hoạt động",
      money: "200000"
    },
    {
      orderID: "1",
      table: "1",
      nameID: "1",
      name: "Smith",
      startTime: "12:00",
      endTime: "12:00",
      date: "2018/12/12",
      status: "đang hoạt động",
      money: "200000"
    },
  ]
}

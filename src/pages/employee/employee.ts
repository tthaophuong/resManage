import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { Staffs } from '../../providers/class/Staffs';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';

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
  items: Array<Staffs> = [];

  constructor(
    public mAppModuel: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams, 
   ) {
  }

  ionViewDidLoad() {
    if(!this.mAppModuel.userIsLogin){
      this.navCtrl.setRoot("LoginPage");
    }

    this.items = RestaurantManager.getInstance().getStaffs();
    RestaurantSFSConnector.getInstance().addListener("EmployeePage", response => {
      this.onExtensions(response);
    })

  }

  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("EmployeePage");
  }

  onExtensions(response) {
    this.mAppModuel.hideLoading();
    let cmd = response.cmd;
    let params = response.params;

    if(cmd == RestaurantCMD.GET_LIST_STAFF){
      this.items = RestaurantManager.getInstance().getStaffs();
    }
  }

  onClickAdd(){
    this.mAppModuel.showModal("AddNewEmployeePage",null,(data)=>{
      if(data){
        this.mAppModuel.showLoading();
        RestaurantSFSConnector.getInstance().getListStaffOfRestaurant(this.mAppModuel.getRestaurantOfUser().getRestaurant_id());
      }
    })
  }

  onClickItem(item: Staffs){
    this.mAppModuel.showModal("EmployeeDetailPage", {id: item.getUserID()});
  }

}

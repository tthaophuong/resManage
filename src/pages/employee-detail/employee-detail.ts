import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { Staffs } from '../../providers/class/Staffs';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';

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

  isEdit: boolean = false;
  mId: number = -1;

  mStaff: Staffs = new Staffs();
  restaurantName: string = "";
  title: string = "Thông tin nhân viên";

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data["id"]){
      this.mId  = this.navParams.get("id");
    }

    this.restaurantName = this.mAppModule.getRestaurantOfUser().getName();
  }
  

  ionViewDidLoad() {
    this.mStaff.fromObject(RestaurantManager.getInstance().getStaffInfo(this.mId));
    RestaurantSFSConnector.getInstance().addListener("EmployeeDetailPage", response => {
      this.onExtensions(response);
    })

  }

  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("EmployeeDetailPage");
  }

  onExtensions(response) {
    this.mAppModule.hideLoading();
    let cmd = response.cmd;
    let params = response.params;

    if(RestaurantClient.getInstance().doCheckStatusParams(params)){
      if(cmd == RestaurantCMD.UPDATE_STAFF_IN_RESTAURANT){
        this.isEdit = false;
        this.showMessageSuccess();
        RestaurantManager.getInstance().getStaffInfo(this.mId).fromObject(this.mStaff);
        this.title = "Thông tin nhân viên";
      }
    }

   
  }

  showMessageSuccess() {
    this.mAppModule.showToast("Thao tác thành công");
  }

  onClickEdit() {
    this.isEdit = true;
    this.title = "Cập nhật thông tin nhân viên";
  }

  onClickSave(){
    this.mAppModule.showLoading();
    this.mStaff.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    RestaurantSFSConnector.getInstance().updateStaffInfoInRestaurant(this.mStaff);
  }

}

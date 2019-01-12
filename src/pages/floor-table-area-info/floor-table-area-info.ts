import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Floors } from '../../providers/class/Floors';
import { Areas } from '../../providers/class/Areas';
import { Tables } from '../../providers/class/Tables';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { Paramskey } from '../../providers/smartfox/Paramkeys';

/**
 * Generated class for the FloorTableAreaInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-floor-table-area-info',
  templateUrl: 'floor-table-area-info.html',
})
export class FloorTableAreaInfoPage {
  mMode: number = 1;
  cateTitle: string = "";
  titles = ["Thông tin tầng", "Thông tin khu vực", "Thông tin bàn"];

  mId: number = -1;

  mFloor: Floors = new Floors();
  mArea: Areas = new Areas();
  mTable: Tables = new Tables();
  restaurantName: string = "";

  mFloors: Array<Floors> = [];

  isEdit: boolean = false;


  constructor(
    public mViewController: ViewController,
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data["mode"]) {
      this.mMode = this.navParams.get("mode");
      this.cateTitle = this.titles[this.mMode - 1];
    }

    if (this.navParams.data["id"]) {
      this.mId = this.navParams.get("id");
    }

    this.restaurantName = this.mAppModule.getRestaurantOfUser().getName();

  }

  ionViewDidLoad() {
    if (this.mMode == 1) {
      this.mFloor.fromObject(RestaurantManager.getInstance().getFloorInfo(this.mId));
    } else if (this.mMode == 2) {
      this.mArea.fromOject(RestaurantManager.getInstance().getAreaInfo(this.mId));
    } else if (this.mMode == 3) {
      this.mTable.fromObject(RestaurantManager.getInstance().getTableInfo(this.mId));
    } else {
      return;
    }

    this.mFloors = RestaurantManager.getInstance().getFloors();

    RestaurantSFSConnector.getInstance().addListener("FloorTableAreaInfoPage", response => {
      this.onExtensions(response);
    })

  }

  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("FloorTableAreaInfoPage");
  }

  onExtensions(response) {
    this.mAppModule.hideLoading();
    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      if (cmd == RestaurantCMD.REMOVE_AREA) {
        this.showMessageSuccess();
        this.mViewController.dismiss(this.mId);
      } else if (cmd == RestaurantCMD.REMOVE_FLOOR) {
        this.showMessageSuccess();
        this.mViewController.dismiss(this.mId);
      } else if (cmd == RestaurantCMD.REMOVE_TABLE) {
        this.showMessageSuccess();
        this.mViewController.dismiss(this.mId);
      }
      else if(cmd == RestaurantCMD.UPDATE_AREA_INFO){
        this.showMessageSuccess();
        this.isEdit = false;
        this.cateTitle = this.titles[this.mMode - 1];
        RestaurantSFSConnector.getInstance().getListAreaOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
      }
      else if(cmd == RestaurantCMD.UPDATE_FLOOR_INFO){
        this.showMessageSuccess();
        this.isEdit = false;
        this.cateTitle = this.titles[this.mMode - 1];
        RestaurantSFSConnector.getInstance().getListFloorOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());

      }
      else if(cmd == RestaurantCMD.UPDATE_TABLE_INFO){
        this.showMessageSuccess();
        this.isEdit = false;
        this.cateTitle = this.titles[this.mMode - 1];
        RestaurantSFSConnector.getInstance().getListTableOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
      }
    } else {
      this.mAppModule.showToast(params.getUtfString(Paramskey.MESSAGE));
    }
  }

  showMessageSuccess() {
    this.mAppModule.showToast("Thao tác thành công");
  }


  onClickDelete() {
    let alert = this.mAppModule.getAlertController().create();
    alert.setTitle("Thông báo");
    alert.setMessage("Bạn muốn xoá đối tượng này khỏi hệ thống?");
    alert.addButton("Không");
    alert.addButton({
      text: "Xoá",
      handler: () => {
        if (this.mMode == 1) {
          this.doRemoveFloor();
        } else if (this.mMode == 2) {
          this.doRemoveArea();
        } else if (this.mMode == 3) {
          this.doRemoveTable();
        } else {
          return;
        }
      }
    });
    alert.present();
  }

  doRemoveFloor() {
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().removeFloor(this.mFloor.getFloor_id());
  }

  doRemoveArea() {
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().removeArea(this.mArea.getArea_id());
  }

  doRemoveTable() {
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().removeTable(this.mTable.getTable_id());
  }

  onClickEdit() {
    this.isEdit = true;
    if (this.mMode == 1) {
      this.cateTitle = "Chỉnh sửa tầng";
    } else if (this.mMode == 2) {
      this.cateTitle = "Chỉnh sửa khu vực";
    } else if (this.mMode == 3) {
      this.cateTitle = "Chỉnh sửa bàn";
    } else {
      return;
    }
  }

  onClickSave() {
    if (this.mMode == 1) {
      this.doUpdateFloor();
    } else if (this.mMode == 2) {
      this.doUpdateArea();
    } else if (this.mMode == 3) {
      this.doUpdateTable();
    } else {
      return;
    }
  }

  doUpdateFloor(){
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().addUpdateFloor(this.mFloor);
  }

  doUpdateArea(){
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().addUpdateArea(this.mArea);
  }

  doUpdateTable(){
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().addUpdateTable(this.mTable);
  }
}

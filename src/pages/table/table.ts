import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { Floors } from '../../providers/class/Floors';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { Paramskey } from '../../providers/smartfox/Paramkeys';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { Areas } from '../../providers/class/Areas';
import { Tables } from '../../providers/class/Tables';

/**
 * Generated class for the TablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "TablePage",
  segment: "table"
})
@Component({
  selector: 'page-table',
  templateUrl: 'table.html',
})
export class TablePage {
  mMode: number = 1;
  cateTitle: string = "";
  titles = ["Thêm tầng","Thêm khu vực chế biến","Thêm bàn"];

  floorName: string = "";
  areaName: string = "";
  tableName: string = "";
  tableCapacity: number = 1;

  mFloors: Array<Floors> = [];
  mFloorID: number = -1;

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if (this.navParams.data["mode"]) {
      this.mMode = this.navParams.get("mode");
      this.cateTitle = this.titles[this.mMode - 1];
    }

    this.mFloors = RestaurantManager.getInstance().getFloors();

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    RestaurantSFSConnector.getInstance().addListener("TablePage",response=>{
      this.onExtensions(response);
    })

  }

  ionViewWillUnload(){
    RestaurantSFSConnector.getInstance().removeListener("TablePage");
  }

  onExtensions(response){
    let cmd = response.cmd;
    let params = response.params;

    if(RestaurantClient.getInstance().doCheckStatusParams(params)){
      // let dataBase = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd,params);
      if(cmd == RestaurantCMD.CREATE_FLOOR){
        this.showMessageSuccess();
      }else if(cmd == RestaurantCMD.CREATE_AREA){
        this.showMessageSuccess();
      }else if(cmd == RestaurantCMD.CREATE_TABLE){
        this.showMessageSuccess();
      }
    }else{
      this.mAppModule.showToast(params.getUtfString(Paramskey.MESSAGE));
    }
  }

  onClickSave(){
    if(this.mMode == 1){
      this.doCreateFloor();
    }else if(this.mMode == 2){
      this.doCreateArea();
    }else if(this.mMode == 3){
      this.doCreateTable();
    }else{
      return;
    }
  }

  doCreateArea(){
    let area = new Areas();
    area.setName(this.areaName);
    area.setFloor_id(parseInt(this.mFloorID+""));
    area.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    RestaurantSFSConnector.getInstance().addNewArea(area);
  }

  doCreateTable(){
    let table = new Tables();
    table.setName(this.tableName);
    table.setFloor_id(parseInt(this.mFloorID+""));
    table.setCapacity(parseInt(this.tableCapacity + ""));
    table.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    RestaurantSFSConnector.getInstance().addNewTable(table);
  }

  doCreateFloor(){
    let floor = new Floors();
    floor.setName(this.floorName);
    floor.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    RestaurantSFSConnector.getInstance().addNewFloor(floor);
  }

  showMessageSuccess(){
    this.navCtrl.pop();
    this.mAppModule.showToast("Thao tác thành công");
  }

}

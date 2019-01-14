import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Floors } from '../../providers/class/Floors';
import { Areas } from '../../providers/class/Areas';
import { Tables } from '../../providers/class/Tables';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { Paramskey } from '../../providers/smartfox/Paramkeys';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface FloorModels {
  floor: Floors;
  areas: Array<Areas>;
  tables: Array<Tables>;
}

@IonicPage(
  {
    name: "MapPage",
    segment: "map"
  }
)
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {


  mArrayFloorModels: Array<FloorModels> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mAppModule: AppControllerProvider) {
  }

  onLoadData() {
    let floors = RestaurantManager.getInstance().getFloors();
    let areas = RestaurantManager.getInstance().getAreas();
    let tables = RestaurantManager.getInstance().getTables();

    this.mArrayFloorModels = [];
    floors.forEach(element => {
      this.mArrayFloorModels.push({
        floor: element,
        areas: areas.filter(area => {
          return area.getFloor_id() == element.getFloor_id()
        }),
        tables: tables.filter(table => {
          return table.getFloor_id() == element.getFloor_id()
        })
      })
    });
  }

  ionViewDidLoad() {
    if (!this.mAppModule.userIsLogin) {
      this.navCtrl.setRoot("LoginPage");
      return;
    }

    this.onLoadData();


    RestaurantSFSConnector.getInstance().addListener("MapPage", response => {
      this.onExtensions(response);
    })
  }

  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("MapPage");
  }

  onExtensions(response) {
    this.mAppModule.hideLoading();
    let cmd = response.cmd;
    let params = response.params; 

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      // let dataBase = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd,params);
      if (cmd == RestaurantCMD.GET_LIST_FLOOR_IN_RESTAURANT) {
        this.onLoadData();
      } else if (cmd == RestaurantCMD.GET_LIST_AREA_IN_RESTAURANT) {
        this.onLoadData();
      } else if (cmd == RestaurantCMD.GET_LIST_TABLE_IN_RESTAURANT) {
        this.onLoadData();
      }
    } else {
      this.mAppModule.showToast(params.getUtfString(Paramskey.MESSAGE));
    }
  }


  onClickAdd() {
    let action = this.mAppModule.getActionSheet().create();
    action.setTitle("Thêm mới");
    action.addButton({
      text: "Thêm tầng",
      handler: () => {
        this.mAppModule.showModal("TablePage", { mode: 1 }, () => {
          this.mAppModule.showLoadingNoduration();
          RestaurantSFSConnector.getInstance().getListFloorOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
        });
      }
    });
    action.addButton({
      text: "Thêm khu vực",
      handler: () => {
        this.mAppModule.showModal("TablePage", { mode: 2 }, () => {
          this.mAppModule.showLoadingNoduration();
          RestaurantSFSConnector.getInstance().getListAreaOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
        });

      }
    });
    action.addButton({
      text: "Thêm bàn",
      handler: () => {
        this.mAppModule.showModal("TablePage", { mode: 3 }, () => {
          this.mAppModule.showLoadingNoduration();
          RestaurantSFSConnector.getInstance().getListTableOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
        });

      }
    });
    action.present();
  }

  onClickFloor(floor: Floors) {
    this.mAppModule.showModal("FloorTableAreaInfoPage", { mode: 1, id: floor.getFloor_id() }, (id) => {
      if (id) {
        RestaurantSFSConnector.getInstance().getListFloorOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
      }
    });
  }
  onClickTable(table: Tables) {
    this.mAppModule.showModal("FloorTableAreaInfoPage", { mode: 3, id: table.getTable_id() }, (id) => {
      if (id) {
        RestaurantSFSConnector.getInstance().getListTableOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
      }
    });
  }
  onClickArea(area: Areas) {
    this.mAppModule.showModal("FloorTableAreaInfoPage", { mode: 2, id: area.getArea_id() }, (id) => {
      if (id) {
        RestaurantSFSConnector.getInstance().getListAreaOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
      }
    });
  }

  
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Floors } from '../../providers/class/Floors';
import { Areas } from '../../providers/class/Areas';
import { Tables } from '../../providers/class/Tables';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface FloorModels{
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
  index: number = 0;
  menu: Array<{ menuSelected: string, subMenu: string }> = [];
  menuSelected: any;

  TABLE: number = 1;
  FLOOR: number = 2;
  AREA: number = 3;

  indexMenu = 1;
  titles = ["Danh sách tầng", "Danh sách khu vực", "Danh sách bàn"];

  mArrayFloorModels : Array<FloorModels> = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modCtrl: ModalController, public mAppModule: AppControllerProvider) {
  }

  onClickMenu(index) {
    this.indexMenu = index;
    this.mname = this.titles[this.indexMenu - 1];
  }
  mname = "Danh sách tầng";
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

createInfo(){
  this.mAppModule.showModal("TablePage",{mode: this.indexMenu})
}
  
  tables = [
    {
      imgs: "../assets/imgs/table-icon-png-6.png",
      name: "Bàn số 1",
    },
    {
      imgs: "../assets/imgs/table-icon-png-6.png",
      name: "Bàn số 1",
    },
    {
      imgs: "../assets/imgs/table-icon-png-6.png",
      name: "Bàn số 1",
    },
    {
      imgs: "../assets/imgs/table-icon-png-6.png",
      name: "Bàn số 1",
    },
    {
      imgs: "../assets/imgs/table-icon-png-6.png",
      name: "Bàn số 1",
    },
    {
      imgs: "../assets/imgs/table-icon-png-6.png",
      name: "Bàn số 1",
    },
    {
      imgs: "../assets/imgs/table-icon-png-6.png",
      name: "Bàn số 1",
    },
    {
      imgs: "../assets/imgs/table-icon-png-6.png",
      name: "Bàn số 1",
    },
  ]

  areaInfo= ["Bar 1", "Bếp 1"]
}

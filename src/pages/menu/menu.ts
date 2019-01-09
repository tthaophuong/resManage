import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
// import { AppModule } from '../../app/app.module';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: "MenuPage",
    segment: "menu"
  }
)
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  index: number = 0;
  num: number = 0;
  menu: Array<{ menuSelected: string, subMenu: string }> = [];
  // category: Array<{ categorySelected: string, subCategory: string }> = [];
  menuSelected: any;

  CATEGORY: number = 1;
  PRODUCT: number = 2;
  COMBO: number = 3;

  indexMenu = 1;


  titles = ["Danh sách danh mục", "Danh sách món ăn", "Danh sách combo"];

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams,
    public modCtrl: ModalController) {
  }

  onClickMenu(index) {
    this.indexMenu = index;
    this.resnames = this.titles[this.indexMenu - 1];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openModelFood() {
    if (this.num=0) {
      this.indexMenu = this.num;
      this.menuSelected = this.menu[this.num - 1]
    }
    this.mAppModule.showModal("FoodInfoPage");
  }
  openModelCombo() {
    this.mAppModule.showModal("ComboPage",{mode: this.indexMenu});

  }
  chdangeIndex(number) {
    this.index = number;
    this.menuSelected = this.menu[this.index];
    if (this.index == 0) {
      this.mAppModule.showModal("FoodPage")
    } if (this.index == 1) {
      this.mAppModule.showModal("ComboListPage")
    }
    if (this.index == 2) {
      this.mAppModule.showModal("DiscountPage")
    }
  }
  resnames = "Danh sách danh mục";
  items = [
    {
      code: "1",
      id: "1 ",
      name: "Salad",
      group: "Đồ ăn",
    },
    {
      code: "1",
      id: "1 ",
      name: "Salad",
      group: "Đồ ăn",
    },
    {
      code: "1",
      id: "1 ",
      name: "Salad",
      group: "Đồ ăn",
    },
    {
      code: "1",
      id: "1 ",
      name: "Salad",
      group: "Đồ ăn",
    },
    {
      code: "1",
      id: "1 ",
      name: "Salad",
      group: "Đồ ăn",
    },
  ];
  foods = [
    {
      codef: "1",
      idf: "1 ",
      namef: "Salad",
      costf: "20000",
      moneyf: "VND",
      countf: "bát",
      kindf: "Đồ ăn",
      statusf: "đang bán",
    },
    {
      codef: "1",
      idf: "1 ",
      namef: "Salad",
      costf: "20000",
      moneyf: "VND",
      countf: "bát",
      kindf: "Đồ ăn",
      statusf: "đang bán",
    },
  ];
  combos = [
    {
      codec: "1",
      idc: "1 ",
      namec: "Salad",
      costc: "20000",
      kindc: "Đồ ăn",
      statusc: "đang bán",
    },
    {
      codec: "1",
      idc: "1 ",
      namec: "Salad",
      costc: "20000",
      kindc: "Đồ ăn",
      statusc: "đang bán",
    },
  ]
}

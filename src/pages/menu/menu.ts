import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { Paramskey } from '../../providers/smartfox/Paramkeys';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
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

  items = [];
  foods = [];
  combos = [];

  CATEGORY: number = 1;
  PRODUCT: number = 2;
  COMBO: number = 3;

  indexMenu = 1;

  titles = ["Danh sách danh mục", "Danh sách món ăn", "Danh sách combo"];
  title: string = "";

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams,
    public modCtrl: ModalController) {
    this.title = this.titles[this.indexMenu - 1];

  }

  onClickMenu(index) {
    this.indexMenu = index;
    this.title = this.titles[this.indexMenu - 1];
  }

  onLoadData(){
    this.items = RestaurantManager.getInstance().getCategorys();
    this.foods = RestaurantManager.getInstance().getProducts();
  }

  ionViewDidLoad() {
    if(!this.mAppModule.userIsLogin){
      this.navCtrl.setRoot("LoginPage");
      return;
    }

    this.onLoadData();
   
    RestaurantSFSConnector.getInstance().addListener("MenuPage",response=>{
      this.onExtension(response);
    })

  }

  onExtension(response){
    let cmd = response.cmd;
    let params = response.params;

    if(RestaurantClient.getInstance().doCheckStatusParams(params)){
      if(cmd == RestaurantCMD.GET_LIST_CATEGORIES_IN_RESTAURANT){
        this.onLoadData();
      }else if(cmd == RestaurantCMD.GET_PRODUCT_IN_RESTAURANT){
        this.onLoadData();
      }
    }else{  
      this.mAppModule.showToast(params.getUtfString(Paramskey.MESSAGE));
    }
  }

  onClickAdd() {
    this.mAppModule.showModal("ComboPage",{mode: this.indexMenu},()=>{
      if(this.indexMenu == this.CATEGORY){
        RestaurantSFSConnector.getInstance().getListCategoryOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
      }else if(this.indexMenu == this.PRODUCT){
        RestaurantSFSConnector.getInstance().getListProductOfRestaurant(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
      }
    });
  }
 
  
}

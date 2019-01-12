import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
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

  ionViewDidLoad() {
    if(!this.mAppModule.userIsLogin){
      this.navCtrl.setRoot("LoginPage");
      return;
    }
    this.items = RestaurantManager.getInstance().getCategorys();
    this.foods = RestaurantManager.getInstance().getProducts();

    
  }

  

  openCategoryDetail(){
    this.mAppModule.showModal("CategoryDetailPage")
  }
  onClickAdd() {
    this.mAppModule.showModal("ComboPage",{mode: this.indexMenu});
  }
 
  
}

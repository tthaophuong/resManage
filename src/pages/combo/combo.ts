import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Products } from '../../providers/class/Products';
import { Categories } from '../../providers/class/Categories';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Areas } from '../../providers/class/Areas';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { Paramskey } from '../../providers/smartfox/Paramkeys';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';

/**
 * Generated class for the ComboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface ProductModels {
  product: Products;
  quantity: number;
}

@IonicPage()
@Component({
  selector: 'page-combo',
  templateUrl: 'combo.html',
})
export class ComboPage {

  mMode: number = 1;
  mTypeCategory: number = 1;
  mArea: number = 1;
  mCurrency: number = 1;

  titles = ["Thêm danh mục", "Thêm món ăn", "Thêm combo"];
  cateTitle = "";

  total_money: number = 0;

  mProducts: Array<Products> = [];
  mProductsProductModels: Array<ProductModels> = [];

  categoryName: string = "";

  mAreas: Array<Areas> = [];

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data["mode"]) {
      this.mMode = this.navParams.get("mode");
      this.cateTitle = this.titles[this.mMode - 1];
    }
  }

  ionViewDidLoad() {
    if (!this.mAppModule.userIsLogin) {
      this.navCtrl.setRoot("LoginPage");
      return;
    }
    RestaurantSFSConnector.getInstance().addListener("", response => {
      this.onExtension(response);
    })
  }

  onExtension(response) {
    this.mAppModule.hideLoading();
    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      if (cmd == RestaurantCMD.CREATE_CATEGORY) {
        this.showMessageSuccess();
      } else if (cmd == RestaurantCMD.ADD_PRODUCT) {
        this.showMessageSuccess();
      }
    } else {
      this.mAppModule.showToast(params.getUtfString(Paramskey.MESSAGE));
    }
  }

  showMessageSuccess() {
    this.navCtrl.pop();
    this.mAppModule.showToast("Thao tác thành công");
  }


  onClickSave() {
    if (this.mMode == 1) {
      this.doCreateCategory();
    } else if (this.mMode == 2) {
      this.doCreateProduct();
    } else if (this.mMode == 3) {
      this.doCreateCombo();
    } else {

    }
  }

  doCreateCategory() {
    this.mAppModule.showLoading();
    let category = new Categories();
    category.setName(this.categoryName);
    category.setType(this.mTypeCategory);
    category.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    RestaurantSFSConnector.getInstance().addNewCategory(category);
  }

  doCreateProduct() {

  }

  doCreateCombo() {

  }

}

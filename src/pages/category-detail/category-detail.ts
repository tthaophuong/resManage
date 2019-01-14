import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { Floors } from '../../providers/class/Floors';
import { Areas } from '../../providers/class/Areas';
import { Tables } from '../../providers/class/Tables';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { Paramskey } from '../../providers/smartfox/Paramkeys';
import { Categories } from '../../providers/class/Categories';
import { Products } from '../../providers/class/Products';

/**
 * Generated class for the CategoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"CategoryDetailPage",
  segment:"category-detail"
})
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {
  mMode: number = 1;
  cateTitle: string = "";
  titles = ["Thông tin danh mục", "Thông tin món ăn", "Thông tin combo"];
  mId: number = -1;
  restaurantName: string = "";
  mAreas: Array<Areas> = [];
  isEdit: boolean = false;

  mCategory: Categories = new Categories();
  mProduct: Products = new Products();

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
      this.mCategory = RestaurantManager.getInstance().getCategoryInfo(this.mId);
    } else if (this.mMode == 2) {
      this.mProduct = RestaurantManager.getInstance().getProductInfo(this.mId);
    } else if (this.mMode == 3) {

    } else {
      return;
    }

    this.mAreas = RestaurantManager.getInstance().getAreas();

    RestaurantSFSConnector.getInstance().addListener("CategoryDetailPage", response => {
      this.onExtensions(response);
    })

  }
 
  ionViewWillUnload() {
    RestaurantSFSConnector.getInstance().removeListener("CategoryDetailPage");
  }

  onExtensions(response) {
    this.mAppModule.hideLoading();
    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      if (cmd == RestaurantCMD.UPDATE_CATEGORY_INFO) {
        this.isEdit = false;
        this.showMessageSuccess();
      } 
      else if (cmd == RestaurantCMD.UPDATE_PRODUCT_INFO) {
        this.isEdit = false;
        this.showMessageSuccess();
      } 
      else if (cmd == RestaurantCMD.REMOVE_CATEGORY) {
        this.showMessageSuccess();
        this.mViewController.dismiss(1);
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
          this.mAppModule.showLoading();
          this.mCategory.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
          RestaurantSFSConnector.getInstance().removeCategory(this.mCategory);
        } else if (this.mMode == 2) {
          // this.mAppModule.showLoading();
        } else if (this.mMode == 3) {

        } else {
          return;
        }
      }
    });
    alert.present();
  }

 

  onClickEdit() {
    this.isEdit = true;
    if (this.mMode == 1) {
      this.cateTitle = "Chỉnh sửa danh mục";
    } 
    else if (this.mMode == 2) {
      this.cateTitle = "Chỉnh sửa sản phẩm";
    } else if (this.mMode == 3) {
      this.cateTitle = "Chỉnh sửa combo";
    } 
    else {
      return;
    }
  }

  onClickSave() {
    if (this.mMode == 1) {
      this.doUpdateCategory();
    } else if (this.mMode == 2) {
      this.doUpdateProduct();
    } else if (this.mMode == 3) {
     
    } else {
      return;
    }
  }

  doUpdateCategory(){
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().updateCategory(this.mCategory);
  }

  doUpdateProduct(){
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().updateProduct(this.mProduct);
  }

  
}

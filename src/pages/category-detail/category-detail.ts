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
import { Combos } from '../../providers/class/Combo';
import { ProductModels } from '../combo/combo';
import { ProductInCombo } from '../../providers/class/ProductInCombo';

/**
 * Generated class for the CategoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "CategoryDetailPage",
  segment: "category-detail"
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
  mCombo: Combos = new Combos();

  mProductModels: Array<ProductModels> = [];

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
      this.mCombo = RestaurantManager.getInstance().getComboInfo(this.mId);
      RestaurantSFSConnector.getInstance().getListProductInCombo(this.mCombo.getCombo_id());
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
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd,params);
      if (cmd == RestaurantCMD.UPDATE_CATEGORY_INFO) {
        this.isEdit = false;
        this.showMessageSuccess();
      }
      else if (cmd == RestaurantCMD.UPDATE_PRODUCT_INFO) {
        this.isEdit = false;
        this.showMessageSuccess();
      }
      else if (cmd == RestaurantCMD.UPDATE_COMBO_INFO) {
        this.isEdit = false;
        this.showMessageSuccess();
      }
      else if (cmd == RestaurantCMD.REMOVE_CATEGORY) {
        this.showMessageSuccess();
        this.mViewController.dismiss(1);
      }
      else if(cmd == RestaurantCMD.GET_PRODUCT_IN_COMBO){
        this.onParseProductInCombo(database);
      }
    } else {
      this.mAppModule.showToast(params.getUtfString(Paramskey.MESSAGE));
    }
  }

  onParseProductInCombo(database){
    let products: Array<ProductInCombo> = database;
    this.mProductModels = [];
    products.forEach(element => {
        let p = RestaurantManager.getInstance().getProductInfo(element.getProduct_id());
        this.mProductModels.push({
          product: p,
          quantity: element.getQuantity()
        });
    });
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
      this.doUpdateCombo();
    } else {
      return;
    }
  }

  doUpdateCategory() {
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().updateCategory(this.mCategory);
  }

  doUpdateProduct() {
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().updateProduct(this.mProduct);
  }


  doUpdateCombo() {
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().updateCombo(this.mCombo);
  }


  onClickSearch() {
    let products = RestaurantManager.getInstance().getProducts();
    let array = [];
    products.forEach(element => {
      array.push({
        name: element.getName(),
        id: element.getProduct_id()
      })
    });

    this.mAppModule.showRadio("Chọn sản phẩm", array, -1, (id) => {
      if (id) {

        let index = products.findIndex(pro => {
          return pro.getProduct_id() == id;
        })

        if (index > -1) {
          if (this.mProductModels.length == 0) {
            this.mProductModels.push({
              product: products[index],
              quantity: 1
            });
          } else {
            let index1 = this.mProductModels.findIndex(p => {
              return p.product.getProduct_id() == products[index].getProduct_id();
            });

            if (index1 > -1) {
              this.mProductModels[index1].quantity += 1;
            } else {
              this.mProductModels.push({
                product: products[index],
                quantity: 1
              });
            }
          }
        }
      }
    })
  }

  getTotalMoney() {
    let sum = 0;
    this.mProductModels.forEach(m => {
      sum += m.product.getPrice() * m.quantity;
    })
    return sum;
  }

  onClickClose(i){
    this.mProductModels.splice(i,1);
  }
}

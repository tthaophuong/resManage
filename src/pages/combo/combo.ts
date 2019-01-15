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
import { Combos } from '../../providers/class/Combo';
import { RestaurantManager } from '../../providers/app-controller/RestaurantManager';
import { ProductInCombo } from '../../providers/class/ProductInCombo';

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
  mProductModels: Array<ProductModels> = [];

  categoryName: string = "";

  mAreas: Array<Areas> = [];
  mCategorys: Array<Categories> = [];

  mCombo: Combos = new Combos();

  mProduct: Products = new Products();

  mTypeCombo: number = 1;
  mTypeHint: number = 1;

  mHints = [
    {name: "Top 5 sản phẩm bán chạy", id: 1},
    {name: "Top 5 sản phẩm bán ít", id: 2},
  ];

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data["mode"]) {
      this.mMode = this.navParams.get("mode");
      this.cateTitle = this.titles[this.mMode - 1];
    }

    if(this.mMode == 3){
      this.onLoadProductModels();
    }
  }

  onChange(){
    this.onLoadProductModels();
  }

  onLoadProductModels(){
    this.mCombo.setName(this.mHints[this.mTypeHint - 1].name);
    let products = [];
    if(this.mTypeCombo == 1){
      products = RestaurantManager.getInstance().getTopProducts();
    }else{
      products = RestaurantManager.getInstance().getBottomProducts();
    }
    this.mProductModels = [];
    products.forEach(element => {
      this.mProductModels.push({
        product: element,
        quantity: 1
      });
    });
  }

  onClickType(number){
    this.mTypeCombo = number;
  }

  ionViewDidLoad() {
    if (!this.mAppModule.userIsLogin) {
      this.navCtrl.setRoot("LoginPage");
      return;
    }
    RestaurantSFSConnector.getInstance().addListener("ComboPage", response => {
      this.onExtension(response);
    })

    this.mCombo.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    this.mAreas = RestaurantManager.getInstance().getAreas();
    this.mCategorys = RestaurantManager.getInstance().getCategorys();

  }

  ionViewWillUnload(){
    RestaurantSFSConnector.getInstance().removeListener("ComboPage");
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
      } else if(cmd == RestaurantCMD.CREATE_COMBO){
        this.onResponseCreateCombo(params);
      } else if (cmd == RestaurantCMD.ADD_PRODUCT_INTO_COMBO){
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
    this.mAppModule.showLoading();
    this.mProduct.setRestaurant_id(this.mAppModule.getRestaurantOfUser().getRestaurant_id());
    RestaurantSFSConnector.getInstance().addNewProduct([this.mProduct]);
  }

  doCreateCombo() {
    this.mAppModule.showLoading();
    RestaurantSFSConnector.getInstance().createCombo(this.mCombo);
  }

  onResponseCreateCombo(params){
    let content = params.getSFSObject(Paramskey.CONTENT);
    let info = content.getSFSObject(Paramskey.INFO);
    this.mCombo.fromSFSObject(info);
    let array : Array<ProductInCombo> = [];
    
    this.mProductModels.forEach(p=>{
      let newP = new ProductInCombo();
      newP.setCombo_id(this.mCombo.getCombo_id());
      newP.setProduct_id(p.product.getProduct_id());
      newP.setQuantity(p.quantity);
      array.push(newP);
    });

    RestaurantSFSConnector.getInstance().addProductIntoCombo(array);
  }

  onClickSearch(){
    let products = RestaurantManager.getInstance().getProducts();
    let array = [];
    products.forEach(element => {
      array.push({
        name: element.getName(),
        id: element.getProduct_id()
      })
    });

    this.mAppModule.showRadio("Chọn sản phẩm", array, -1,(id)=>{
      if(id){

        let index = products.findIndex(pro=>{
          return pro.getProduct_id() == id;
        })

        if(index > -1){
          if(this.mProductModels.length == 0){
            this.mProductModels.push({
              product : products[index],
              quantity: 1
            });
          }else{
            let index1 = this.mProductModels.findIndex(p=>{
              return p.product.getProduct_id() == products[index].getProduct_id();
            });
  
            if(index1 > -1){
              this.mProductModels[index1].quantity+=1;
            }else{
              this.mProductModels.push({
                product : products[index],
                quantity: 1
              });
            }
          }
        }
      }
    })
  }

  getTotalMoney(){
    let sum = 0;
    this.mProductModels.forEach(m=>{
      sum+= m.product.getPrice() * m.quantity;
    })
    return sum;
  }

  onClickClose(i){
    this.mProductModels.splice(i,1);
  }

}

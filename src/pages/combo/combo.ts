import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Products } from '../../providers/class/Products';

/**
 * Generated class for the ComboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface ProductModels{
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

  cateTitle = "Thêm danh mục";
  titles = ["Thêm danh mục", "Thêm món ăn", "Thêm combo"];

  total_money: number = 0;

  mProducts: Array<Products> = [];
  mProductsProductModels: Array<ProductModels> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data["mode"]) {
      this.mMode = this.navParams.get("mode");
      this.cateTitle = this.titles[this.mMode - 1];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComboPage');
  }
  closeCombo() {
    this.navCtrl.pop();
  }
  
  items = [
    {
      name: "product",
      quantity: "1",
    }
  ]
}

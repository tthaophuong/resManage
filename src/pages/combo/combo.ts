import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ComboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-combo',
  templateUrl: 'combo.html',
})
export class ComboPage {

  mMode: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data["mode"]){
      this.mMode = this.navParams.get("mode");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComboPage');
  }
  closeCombo(){
    this.navCtrl.pop();
  }
  cateTitle="Thêm danh mục";
  titles = ["Thêm danh mục", "Thêm món ăn", "Combo của nhà hàng"];
items=[
  {
    name:"product",
    quantity:"1",
  }
]
}

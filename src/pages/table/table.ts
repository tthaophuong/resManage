import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "TablePage",
  segment: "table"
}) 
@Component({
  selector: 'page-table',
  templateUrl: 'table.html',
})
export class TablePage {
mMode: number =1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if(this.navParams.data["mode"]){
      this.mMode = this.navParams.get("mode");
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePage');
  }

}

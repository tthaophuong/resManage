import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

/**
 * Generated class for the FoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: "FoodPage",
    segment: "food"
  }
)
@Component({
  selector: 'page-food',
  templateUrl: 'food.html',
})
export class FoodPage {
  // mCtrls: any;
  // mModalController: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mAppModule: AppControllerProvider) {
      var acc = document.getElementsByClassName("dropdown");
      var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

  onClickOpenPanel(divID: string){
    let ele = document.getElementById(divID);
    if(ele){
      console.log(ele.style.display);
      
      if(ele.style.display == "block"){
        ele.style.display = "none";
      }else{
        ele.style.display = "block";
      }
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodPage');
  }
  moveFoodInfo() {
    this.mAppModule.showModal("FoodInfoPage")
  }
  closeCombo() {
    this.navCtrl.pop();
  }


// foods=["Hải sản","Salad","Gà","Bò"]; 
items = [
  {
    name: "1. Salad Nga",
    describe: "xà lách, cà chua",
    cost: "5$",
  },
  {
    name: "1. Salad Nga",
    describe: "xà lách, cà chua",
    cost: "5$",
  },
  {
    name: "1. Salad Nga",
    describe: "xà lách, cà chua",
    cost: "5$",
  },
]
}

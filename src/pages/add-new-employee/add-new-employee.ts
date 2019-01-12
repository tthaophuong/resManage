import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantClient } from '../../providers/smartfox/RestaurantClient';
import { Paramskey } from '../../providers/smartfox/Paramkeys';
import { RestaurantCMD } from '../../providers/smartfox/RestaurantCMD';
import { Users } from '../../providers/class/Users';
import { UserData } from '../../providers/class/UserData';

/**
 * Generated class for the AddNewEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-employee',
  templateUrl: 'add-new-employee.html',
})
export class AddNewEmployeePage {
  mUserData : UserData = new UserData();
  constructor(
    public mViewController: ViewController,
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    RestaurantSFSConnector.getInstance().addListener("AddNewEmployeePage", response=>{
      this.onExtension(response);
    })
  }

  ionViewWillUnload(){
    RestaurantSFSConnector.getInstance().removeListener("AddNewEmployeePage");
  }

  onExtension(response){
    this.mAppModule.hideLoading();
    let cmd = response.cmd;
    let params = response.params;

    if(RestaurantClient.getInstance().doCheckStatusParams(params)){
      let database = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd,params);

      if(cmd == RestaurantCMD.CREATE_ACCOUNT){
        this.onCreateAccountSuccess(database);
      }else if (cmd == RestaurantCMD.ADD_STAFF_INTO_RESTAURANT){
        this.showMessageSuccess();
      }
    }else{
      this.mAppModule.showToast(params.getUtfString(Paramskey.MESSAGE));
    }
  }

  showMessageSuccess() {
    this.mAppModule.showToast("Thao tác thành công");
    this.mViewController.dismiss(1);
  }

  onCreateAccountSuccess(database){
    let newUser = new Users();
    newUser.fromSFSObject(database);
    RestaurantSFSConnector.getInstance().addUserToRestaurant(newUser.getUserID(), this.mAppModule.getRestaurantOfUser().getRestaurant_id());
  }

  onClickSave(){
    if(this.mUserData.getUserName().trim() == ''  || this.mUserData.getPassword().trim() == ''){
      return;
    }
    RestaurantSFSConnector.getInstance().doSignUp(this.mUserData);
  }

}

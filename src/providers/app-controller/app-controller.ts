import { Injectable } from '@angular/core';
import { ModalController, NavController, ToastController, App, ActionSheetController, LoadingController, Loading, AlertCmp, AlertController } from 'ionic-angular';
import { Calendar } from './calendar';
import { RestaurantSFSConnector } from '../smartfox/SFSConnector';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Config } from '../core/app/config';
import { UserData } from '../class/UserData';
import { RestaurantClient } from '../smartfox/RestaurantClient';
import { Paramskey } from '../smartfox/Paramkeys';
import { RestaurantCMD } from '../smartfox/RestaurantCMD';
import { RestaurantOfUser } from '../class/RestaurantOfUser';
import { Users } from '../class/Users';
import { HomePage } from '../../pages/home/home';
import { RestaurantManager } from './RestaurantManager';

/*
  Generated class for the AppControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppControllerProvider {
  USERLOGIN: string = "userlogin";

  userIsLogin: boolean = false;
  private mAppConfig: Config;
  private mUserData: UserData = new UserData();
  private mUser: Users = new Users();
  private mRestaurantOfUser: Array<RestaurantOfUser> = [];
  mLoading : Loading = null;
  constructor(
    public mApp: App,
    public http: Http,
    public mAlertController: AlertController,
    public mLoadingController: LoadingController,
    public mModalController: ModalController,
    public mActionSheet: ActionSheetController,
    public mToast: ToastController,
  ) {
    this.mAppConfig = new Config();
  }

  public getAlertController(){
    return this.mAlertController;
  }

  async showLoading(content?: string, cssClass?: string, duration?: number) {
    if (this.mLoading) {
      try {
        await this.mLoading.dismiss()
      } catch (error) { }
    }
    this.mLoading = this.mLoadingController.create({
      duration: duration ? duration : 3000,
      dismissOnPageChange: true,
      content: content ? content : "Waiting...!",
      cssClass: cssClass ? cssClass : ""
    });
    this.mLoading.present();
  }

  async showLoadingNoduration(content?: string, cssClass?: string) {
    if (this.mLoading) {
      try {
        await this.mLoading.dismiss()
      } catch (error) { }
    }
    this.mLoading = this.mLoadingController.create({
      dismissOnPageChange: true,
      content: content ? content : "Waiting...!",
      cssClass: cssClass ? cssClass : ""
    });
    this.mLoading.present();
  }


  public hideLoading(): void {
    if (this.mLoading) {
      this.mLoading.dismiss();
      this.mLoading = null;
    }
  }

  public getActionSheet(){
    return this.mActionSheet;
  }

  public _loadAppConfig() {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/data/config.json').map(res => res.json()).subscribe(data => {
        if (data) {
          this.onResponeAppConfig(data);
          resolve(data);
        } else {
          reject();
        }
      })
    })

  }

  public onResponeAppConfig(data) {
    this.mAppConfig.setData(data);
    RestaurantSFSConnector.getInstance().setData(this.mAppConfig.get("smartfox"));
  }

  public getUserData() {
    return this.mUserData;
  }
  public getUser(): Users {
    return this.mUser;
  }

  public onLoginSuccess(params) {
    this.userIsLogin = true;
    let dataObject = params['data'].getSFSObject(Paramskey.CONTENT);
    let room_name = dataObject.getUtfString(Paramskey.ROOM_NAME);

    let user = dataObject.getSFSObject(Paramskey.USER);
    this.getUser().fromSFSObject(user);

    RestaurantSFSConnector.getInstance().requestJoinRoom(room_name).then(() => {
      this.onJoinRoomSuccess();
    }).catch(err => {
      alert(err);
    })
  }

  public onJoinRoomSuccess() {
    RestaurantSFSConnector.getInstance().addListenerForExtensionResponse();
    RestaurantSFSConnector.getInstance().addListener("AppControllerProvider", response => {
      this.onExtensionRespone(response);
    })
    RestaurantSFSConnector.getInstance().getRestaurantOfUser();

  }

  public onExtensionRespone(response) {
    let cmd = response.cmd;
    let params = response.params;

    if (RestaurantClient.getInstance().doCheckStatusParams(params)) {
      let dataBase = RestaurantClient.getInstance().doBaseDataWithCMDParams(cmd, params);
      if (cmd == RestaurantCMD.GET_RESTAURANT_OF_USER) {
        this.onGetRestaurantOfUser(dataBase);
        this.mApp.getRootNav().setRoot(HomePage);
      } else if (cmd == RestaurantCMD.GET_LIST_CATEGORIES_IN_RESTAURANT) {
        RestaurantManager.getInstance().setCategors(dataBase);
      } else if (cmd == RestaurantCMD.GET_PRODUCT_IN_RESTAURANT) {
        RestaurantManager.getInstance().setProducts(dataBase);
      } else if (cmd == RestaurantCMD.GET_LIST_FLOOR_IN_RESTAURANT) {
        RestaurantManager.getInstance().setFloors(dataBase);
      } else if (cmd == RestaurantCMD.GET_LIST_AREA_IN_RESTAURANT) {
        RestaurantManager.getInstance().setAreas(dataBase);
      } else if (cmd == RestaurantCMD.GET_LIST_TABLE_IN_RESTAURANT) {
        RestaurantManager.getInstance().setTables(dataBase);
      }
    } else {
      this.showToast(params.getUtfString(Paramskey.MESSAGE));
    }
  }

  public onGetRestaurantOfUser(params) {
    this.mRestaurantOfUser = params;
    RestaurantSFSConnector.getInstance().getListCategoryOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());
    RestaurantSFSConnector.getInstance().getListProductOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());
    RestaurantSFSConnector.getInstance().getListTableOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());
    RestaurantSFSConnector.getInstance().getListAreaOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());
    RestaurantSFSConnector.getInstance().getListFloorOfRestaurant(this.mRestaurantOfUser[0].getRestaurant_id());

  }

  public showModal(page: string, params?: any,callback?:any) {
    let modal = this.mModalController.create(page, params ? params : null);
    modal.present();
    modal.onDidDismiss((data)=>{
      if(callback){
        callback(data);
      }
    })
  }

  public getRestaurantOfUser() {
    if (this.mRestaurantOfUser.length == 0) {
      return new RestaurantOfUser();
    }
    return this.mRestaurantOfUser[0];
  }

  public showToast(message, position?: string) {
    let toast = this.mToast.create({
      message: message,
      position: position ? position : "bottom",
      duration: 3000
    });

    toast.present();
  }

  public saveUserLoginData(data) {
    // return this.mStorageController.saveDataToStorage(this.USERLOGIN, JSON.stringify(data));
  }


  public _createCalendar(): Calendar {
    let today = new Date();
    return new Calendar(today.getMonth() + 1, today.getFullYear());
  }
}

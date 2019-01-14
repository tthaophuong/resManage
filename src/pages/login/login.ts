import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';
import { RestaurantSFSConnector } from '../../providers/smartfox/SFSConnector';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string = "";
  password: string = "";

  constructor(
    public mAppModule: AppControllerProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.mAppModule._loadAppConfig().then(()=>{
      
    })

    this.mAppModule.getUserLogin().then((data)=>{
      if(data){
        this.mAppModule.showLoading();
        let database = JSON.parse(data);
        this.username = database.username;
        this.password = database.password;
        this.login();
      }
    }).catch(err=>{

    })
  }

  doConnectToServer(){
    RestaurantSFSConnector.getInstance().connect().then(()=>{
      this.onConnectSuccess();
    }).catch(err=>{
      this.mAppModule.hideLoading();
      alert("Không thể kết nối server!");
    })
  }

  onConnectSuccess(){
    this.mAppModule.getUserData().setUsername(this.username);
    this.mAppModule.getUserData().setPassword(this.password);
    
    RestaurantSFSConnector.getInstance().doLogin(this.mAppModule.getUserData()).then((success) => {
      this.onLoginSuccess(success);
    }).catch(err=>{
      this.mAppModule.hideLoading();
      alert("Đăng nhập thất bại!");
    })
  }

  login() {
    this.doConnectToServer();
  }

  onLoginSuccess(success) {
    this.mAppModule.hideLoading();
    this.mAppModule.saveUserLoginData(this.mAppModule.getUserData());
    this.mAppModule.onLoginSuccess(success);
  }

}

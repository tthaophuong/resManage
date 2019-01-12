import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AppControllerProvider } from '../providers/app-controller/app-controller';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "LoginPage";
  menuId: number = 1;
  mMenuItems = [
    {id: 1, name: "Trang chủ", icon: "home", url: ""},
    {id: 2, name: "Thực đơn", icon: "restaurant", url: "#/menu"},
    {id: 3, name: "Sơ đồ", icon: "map", url: "#/map"},
    {id: 4, name: "Nhân viên", icon: "bookmarks", url: "#/employee"},
    {id: 5, name: "Order", icon: "clipboard", url: "#/order"},
    {id: 6, name: "Lịch làm việc", icon: "copy", url: "#/schedule"},
    {id: 7, name: "Báo cáo", icon: "calendar", url: "#/report"},
    {id: 8, name: "Khuyến mại", icon: "cash", url: "#/discount"}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public mAppModule: AppControllerProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openModal(){
    this.mAppModule.showModal("LoginPage");
  }

  onClickMenuItem(item){
    this.menuId = item.id;
  }
}


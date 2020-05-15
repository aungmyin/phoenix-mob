import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public authUser: any;

  activeMenu: String;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authServices: AuthService,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
    this.authServices.userData$.subscribe((res: any) => {
      this.authUser = res;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  navigateToLoginPage(){
    // router naviage to login page
    this.router.navigate(['home/feed']);
    this.closeMenu();
  }

  closeMenu() {
    this.menu.close();
  }

  logoutAction() {
    this.authServices.logout();
    //window.location.href="/login";
  }

  changePasswordAction() {
    this.router.navigate(['home/messages']);
    this.closeMenu();
  }

  gotoWorkReportAction() {
    this.router.navigate(['home/workreport']);
    this.closeMenu();
  }

}

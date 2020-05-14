import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  postData = {
    username: '',
    password: '',
    company: ''
  };

  activeMenu: String;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private menu: MenuController
  ) {
    this.menuActive();
  }

  ngOnInit() {}

  validateInputs() {
    console.log(this.postData);
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    let company = this.postData.company.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      this.postData.company &&
      username.length > 0 &&
      password.length > 0 &&
      company.length > 0
    );
  }

  menuActive() {
    this.activeMenu = "first";
    this.menu.enable(false, "first");
  }

  loginAction() {
    if (this.validateInputs()) {
      this.authService.login(this.postData).subscribe(
        (res: any) => {
          console.log(res);
          if (res['access-token']) {
            // Storing the User data.
            this.storageService
              .store(AuthConstants.AUTH, res)
              .then(res => {
                //this.router.navigate(['home']);
                window.location.href = "/home/feed";
              });
          } else {
            this.toastService.presentToast('Incorrect username and password.');
          }
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast(
        'Please enter email/username or password.'
      );
    }
  }
  
}

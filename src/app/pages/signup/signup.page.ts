import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from './../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  postData = {
    name: '',
    username: '',
    email: '',
    password: '',
    company: ''
  };

  activeMenu: String;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private router: Router,
    private menu: MenuController
  ) {
    this.menuActive();
  }

  ngOnInit() {}

  validateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    let email = this.postData.email.trim();
    let name = this.postData.name.trim();
    let company = this.postData.company.trim();
    return (
      this.postData.name &&
      this.postData.username &&
      this.postData.password &&
      this.postData.email &&
      this.postData.company &&
      email.length > 0 &&
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0&&
      company.length > 0
    );
  }

  menuActive() {
    this.activeMenu = "first";
    this.menu.enable(false, "first");
  }

  signupAction() {
    if (this.validateInputs()) {
      this.authService.signup(this.postData).subscribe(
        (res: any) => {
          if (res.userData) {
            // Storing the User data.
            this.storageService
              .store(AuthConstants.AUTH, res.userData)
              .then(res => {
                this.router.navigate(['home/feed']);
              });
          } else {
            this.toastService.presentToast(
              'Data alreay exists, please enter new details.'
            );
          }
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast(
        'Please enter name, email, username or password.'
      );
    }
  }
}

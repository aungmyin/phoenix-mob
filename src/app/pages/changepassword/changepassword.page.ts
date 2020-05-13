import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  activeMenu: String;

  postData = {
    password: '',
    retype_password: ''
  };

  constructor(private menu: MenuController, private toastService: ToastService) {
    this.menuActive();
  }

  ngOnInit() {
  }

  menuActive() {
    this.activeMenu = "first";
    this.menu.enable(false, "first");
  }

  validateInputs() {
    let password = this.postData.password.trim();
    let retype_password = this.postData.retype_password.trim();

    return (
      this.postData.password &&
      password.length > 0 &&
      retype_password.length > 0 &&
      password == retype_password
    );
  }

  changePasswordAction() {
    if(this.validateInputs()) {
      console.log(this.postData);
    } else {
      this.toastService.presentToast(
        'Please enter password or retypepassword OR do not match.'
      );
    }
  }

}

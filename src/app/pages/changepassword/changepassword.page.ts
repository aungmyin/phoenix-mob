import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  activeMenu: String;

  dlyuser: any;

  postData = {
    company: '',
    email: '',
    old_password: '',
    new_password: '',
    token: ''
  };

  constructor(private menu: MenuController, private toastService: ToastService, private authoService: AuthService) {
    //this.menuActive();
  }

  ngOnInit() {
    this.authoService.userData$.subscribe( (res: any) => {
      console.log(res);
     this.dlyuser = res;
    });
  }

  menuActive() {
    this.activeMenu = "first";
    this.menu.enable(false, "first");
  }

  validateInputs() {
    let new_password = this.postData.new_password.trim();
    let old_password = this.postData.old_password.trim();
    let email = this.postData.email.trim();

    return (
      new_password &&
      old_password &&
      email &&
      new_password.length > 0 &&
      old_password.length > 0 &&
      email.length > 0
    );
  }

  changePasswordAction() {
    if(this.validateInputs()) {
      this.postData.token = this.dlyuser['access-token'];
      this.postData.company = this.dlyuser['company'];
      this.postData.email = this.dlyuser['name'];
      console.log(this.postData);
      this.authoService.updatepassword(this.postData).subscribe( (res: any) => {
        console.log(res);
      });

    } else {
      this.toastService.presentToast(
        'Please enter password or retypepassword OR do not match.'
      );
    }
  }

}

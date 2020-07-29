import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  postData = {
    username: '',
    company: '',
    token: ''
  }

  activeMenu: String;
  dlyuser: any;

  constructor(private menu: MenuController, private authoService: AuthService, private toastService: ToastService) { }

  ngOnInit() {
    /* this.authoService.userData$.subscribe( (res: any) => {
      console.log(res);
     this.dlyuser = res;
    }); */
  }

  menuActive() {
    this.activeMenu = "first";
    this.menu.enable(false, "first");
  }

  validateInputs() {
    let username = this.postData.username.trim();
    let company = this.postData.company.trim();

    return (
      username &&
      company &&
      username.length > 0 &&
      company.length > 0 
    );
  }

  forgotPasswordAction(){
    if(this.validateInputs()) {
      console.log(this.postData);
      this.authoService.forgotpassword( this.postData ).subscribe( (res: any) => {
        console.log(res);
        if(res.status == 1) {
          this.toastService.presentToast("We have benn sent reset url in your mail.");
        } else if(res.error) {
            this.toastService.presentToast(res.error);
        }
      } );

    } else {
      this.toastService.presentToast("Invalid entry");
    }
  }

}

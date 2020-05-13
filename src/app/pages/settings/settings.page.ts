import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

function helloalert() {
  alert('Hello!!!');
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})


export class SettingsPage implements OnInit {

  displayUserData: any;

  constructor(private authoService: AuthService) { }

  ngOnInit() {
    this.authoService.userData$.subscribe( (res: any) => {
      //console.log(res);
      this.displayUserData = res;
    });

   // helloalert();
  }

  logoutAction() {
    this.authoService.logout();
  }

}

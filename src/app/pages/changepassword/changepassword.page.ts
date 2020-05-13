import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  activeMenu: String;

  constructor(private menu: MenuController) {
    this.menuActive();
  }

  ngOnInit() {
  }

  menuActive() {
    this.activeMenu = "first";
    this.menu.enable(false, "first");
  }

}

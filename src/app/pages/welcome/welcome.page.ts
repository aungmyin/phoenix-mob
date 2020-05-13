import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { AuthService } from './../../services/auth.service';
import { ToastService } from './../../services/toast.service';
import { MenuController } from '@ionic/angular';
import {formatDate} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss']
})
export class FeedPage implements OnInit {
  public authUser: any;

  postData = {
    user_id: '',
    token: ''
  };

  curtime: any;
  greetingmsg: String;

  constructor(
    private auth: AuthService,
    private feedSerive: FeedService,
    private toastService: ToastService,
    private menu: MenuController,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      //this.getFeedData();
    });

    this.curtime = formatDate(new Date(), 'HH', 'en');

    console.log( this.curtime );

    this.greetingMessage();

  }

  greetingMessage() {

    if (this.curtime <= 11) {
      this.greetingmsg = "Good Morning,";
    } else if (this.curtime <= 16) {
      this.greetingmsg = "Good Afternoon,";
    } else {
      this.greetingmsg = "Good Evening,";
    }

  }

  gotoPagesAction(urls: String) {
    this.router.navigate([urls]);
  }

  getFeedData() {
    this.postData.user_id = this.authUser.user_id;
    this.postData.token = this.authUser.token;
    
   // console.log(this.postData);
   if (this.postData.user_id && this.postData.token) {
      this.feedSerive.feedData(this.postData).subscribe(
        (res: any) => {
          //console.log(res.feedData); refresh data
          this.feedSerive.changeFeedData(res.feedData);
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast("loading ...");
    }
  }

}

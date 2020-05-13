import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public authUser: any;

  postData = {
    user_id: '',
    token: ''
  };

  constructor(
    private auth: AuthService,
    private feedService: FeedService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.auth.userData$.subscribe( (res: any) => {
      this.authUser = res;
      this.getFeedData();
    })
  }

  getFeedData() {
    this.postData.user_id = this.authUser.user_id;
    this.postData.token = this.authUser.token;
    
   // console.log(this.postData);
   if (this.postData.user_id && this.postData.token) {
      this.feedService.feedData(this.postData).subscribe(
        (res: any) => {
          //console.log(res.feedData);
          this.feedService.changeFeedData(res.feedData);
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

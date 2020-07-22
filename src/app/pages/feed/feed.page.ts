import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { AuthService } from './../../services/auth.service';
import { ToastService } from './../../services/toast.service';
import { MenuController } from '@ionic/angular';
import {formatDate} from '@angular/common';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { CustomerWorkreportInfoService } from 'src/app/services/customer-workreport-info.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss']
})
export class FeedPage implements OnInit {
  public authUser: any;

  postData = {
    member_id: '',
    year: '',
    month: ''
  };

  curtime: any;
  greetingmsg: String;
  newData: any;
  newDate: any;
  newMonth: any;

  constructor(
    private auth: AuthService,
    private feedSerive: FeedService,
    private toastService: ToastService,
    private menu: MenuController,
    private router: Router,
    private route: ActivatedRoute,
    private customerServices: CustomerWorkreportInfoService
  ) {}

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      //this.getFeedData();
    });

    //for getting parameters
    this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
     // console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year || this.postData.year == '') {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
      console.log(this.newDate + this.newMonth + "current year");
    }

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
    //urls = urls + "?year=" + this.postData.year + "&month=" + this.postData.month;
    this.router.navigate([urls], { queryParams: { year: this.postData.year, month: this.postData.month }});
  }

  //customer workreport data
  goMoreInfo(urls: String) {
    this.postData.member_id = this.authUser.email;
    //console.log(this.postData.month + " login");
    //search by date again
    this.customerServices.getcustomerData(this.postData).subscribe( (res: any) => {
      this.newData = res;
      //console.log(this.newData.customer_work_report);
      this.customerServices.updateCustomerData(res);

      let navigationExtras: NavigationExtras = {
        state: {
          special: this.newData.customer_work_report,
          year: this.postData.year,
          month: this.postData.month
        }
      };
    
      this.router.navigate([urls], navigationExtras);
    });
    
  }

 /* getFeedData() {
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
  }*/

}

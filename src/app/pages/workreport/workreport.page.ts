import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { HttpService } from 'src/app/services/http.service';
import { MemberInfoService } from 'src/app/services/member-info.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-workreport',
  templateUrl: './workreport.page.html',
  styleUrls: ['./workreport.page.scss'],
})


export class WorkreportPage implements OnInit {
  public authUser: any;
  
  postData = {
    year: '',
    month: '',
    member_id: ''
  }

  newDate: any;
  newMonth: any;

  items: any = [];
  tran_expen: any = [];
  yeardropdown: any = [];
  yearlist: any = [];
  compareTranEx: any;
  itemExpandedHeight: number = 200;


  constructor(private auth: AuthService, private toastService: ToastService, private memberInfo: MemberInfoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //for getting parameters
    this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
      console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year || this.postData.year == '') {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
      console.log(this.newDate + this.newMonth + "current year");
    }

    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
     // console.log(this.authUser);
      this.getWorkReportData();
    });

    this.items = [
      {expanded: false},
      {expanded: false}
    ]

    this.tran_expen = [
      {
        id: 0,
        value: 'No'
      },
      {
        id: 1,
        value: 'Yes'
      }
    ];


  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
     // console.log(this.authUser);
      this.getWorkReportData();
      event.target.complete();
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      
    }, 5000);
  }

  getWorkReportData() {
    this.postData.member_id = this.authUser.email;
    
   // console.log(this.postData + "mingalar");
   if (this.postData.member_id) {
      this.memberInfo.memberData(this.postData).subscribe(
        (res: any) => {
          console.log(res.member_info); //refresh data
          this.memberInfo.changeMemberData(res.member_info);
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast("loading ...");
    }
  }

  expandedItem(item: any) {
    item.expanded = !item.expanded;
  }

  goMoreInfo(urls: String) {
    this.router.navigate([urls], { queryParams: { 'year': this.postData.year, 'month': this.postData.month } });
  }

  unread() {

  }

}

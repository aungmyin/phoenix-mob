import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerWorkreportInfoService } from 'src/app/services/customer-workreport-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-customerwkreport',
  templateUrl: './customerwkreport.page.html',
  styleUrls: ['./customerwkreport.page.scss'],
})
export class CustomerwkreportPage implements OnInit {

  postData = {
    year: '',
    month: '',
    member_id: ''
  }

  public authUser: any;

  newDate: any;
  newMonth: any;

  constructor(private route: ActivatedRoute, private auth: AuthService, private toastService: ToastService, private customerServe: CustomerWorkreportInfoService) { }

  ngOnInit() {
    //for getting parameters
    this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
      console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year || this.postData.year.length == 0) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }

    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
     // console.log(this.authUser);
      this.getCustomerWorkReportData();
    });
  }

  getCustomerWorkReportData() {
    this.postData.member_id = this.authUser.email;
    
   // console.log(this.postData + "mingalar");
   if (this.postData.member_id) {
      this.customerServe.getcustomerData(this.postData).subscribe(
        (res: any) => {
         // console.log(res.customer_work_report[0]); //refresh data
          this.customerServe.updateCustomerData(res);
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

import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { CustomerWorkreportInfoService } from 'src/app/services/customer-workreport-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-workreport-info',
  templateUrl: './customer-workreport-info.component.html',
  styleUrls: ['./customer-workreport-info.component.scss'],
})
export class CustomerWorkreportInfoComponent implements OnInit {
  @Input() loginUser: any;

  postData = {
    year: '',
    month: '',
    member_id: '',
    customerName: '',
    projectName: '',
    contractPeriod: '',
    custWkReport: '',
    actWorkHour: ''
  }

  items: any = [];
  tran_expen: any = [];
  report_flgs: any = [];

  newDate: any;
  newMonth: any;

  compareTranEx: any;
  customerWorkReport: any;
  projectInfo: any;
  displayUserData: any;

  constructor(private authService: AuthService, private route: ActivatedRoute, private customerService: CustomerWorkreportInfoService, private toastService: ToastService) { }

  ngOnInit() {
    //for getting parameters
    this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
      //console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }
   /* this.customerService.customerData$.subscribe((res: any) => {
      console.log(res);
      this.customerWorkReport = res.customer_work_report[0];
      this.projectInfo = res.project_info.project_infos[0];
    }); */

    this.postData.member_id = this.loginUser.email;
    console.log(this.loginUser.member_id);
    this.customerService.getcustomerData( this.postData ).subscribe( (res: any) => {
      
      //dthis.customerWorkReport = res.customer_work_report[0];
      //this.projectInfo = res.project_info.project_infos[0];
      console.log(res);
    },
    (error: any) => {
      this.toastService.presentToast('Network Issue.');
    });

    this.report_flgs = [
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
   // this.authService.userData$.subscribe((res: any) => {
     // this.authUser = res;
     // console.log(this.authUser);
      this.getWorkReportDetailByEmpID();
      event.target.complete();
    //});
    setTimeout(() => {
      console.log('Async operation has ended');
      
    }, 3000);
  }

  getWorkReportDetailByEmpID() {
    //console.log(this.loginUser);
    this.postData.member_id = this.loginUser.email;
    
    this.customerService.getcustomerData( this.postData ).subscribe( (res: any) => {
      
      this.customerWorkReport = res.customer_work_report[0];
      this.projectInfo = res.project_info.project_infos[0];
      console.log(res);
    },
    (error: any) => {
      this.toastService.presentToast('Network Issue.');
    });
  }

}

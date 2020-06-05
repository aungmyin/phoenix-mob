import { Component, OnInit } from '@angular/core';
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

  postData = {
    year: '',
    month: '',
    member_id: '',
    customerName: '',
    projectName: '',
    contractPeriod: '',
    custWkReport: '',
    actWorkHour: '',
    note: ''
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
      console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year || this.postData.year.length == 0) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }

    this.authService.userData$.subscribe( (res: any) => {
      console.log(res + "sustomer");
      this.displayUserData = res;
      this.getWorkReportDetailByEmpID();
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

  getWorkReportDetailByEmpID() {
    this.postData.member_id = this.displayUserData['email'];
    
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

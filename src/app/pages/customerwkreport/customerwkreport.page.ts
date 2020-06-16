import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    member_id: '',
    cwfile: '',
    actWorkHour: ''
  }

  public authUser: any;

  customerWorkReport: any;
  projectInfo: any;

  newDate: any;
  newMonth: any;

  data: any;
  customerReports: any;  
  report_flgs: any;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private toastService: ToastService, private customerServe: CustomerWorkreportInfoService) { }

  ngOnInit() {
   
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

    //for getting parameters
    this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
      //console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year || this.postData.year.length == 0) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }

    this.customerReports = "";
   
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = '';
        this.data = this.router.getCurrentNavigation().extras.state.special;
        this.postData.year = this.router.getCurrentNavigation().extras.state.year;
        this.postData.month = this.router.getCurrentNavigation().extras.state.month;
        this.customerReports = this.data.customer_work_report;
        console.log(this.data);
        console.log("hello customer");
      }
    });

    
  }


}

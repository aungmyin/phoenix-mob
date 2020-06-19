import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { HttpService } from 'src/app/services/http.service';
import { MemberInfoService } from 'src/app/services/member-info.service';
import { ToastService } from 'src/app/services/toast.service';
import { CustomerWorkreportInfoService } from 'src/app/services/customer-workreport-info.service';
import { TransportationExpenseService } from 'src/app/services/transportation-expense.service';

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
    member_id: '',
    member_info: ''
  }

  customer = {
    client_name: '',
    project_name: '',
    contract_period: '',
    client_report_flg: '',
    customer_working_time: '',
  }

  newDate: any;
  newMonth: any;

  items: any = [];
  tran_expen: any = [];
  yeardropdown: any = [];
  yearlist: any = [];
  compareTranEx: any;
  itemExpandedHeight: number = 200;

  data: any;
  newData: any;
  customerWorkReport: any;
  clientRpFlg: any;
  workingPattern: any;
  workingHour: any;

  wkreport_detail: any;
  wkReport: any;
  workPattern: any;
  workPatternExist: any;
  wkreport_detail_date: any;
  tranSportExpense: any;

  constructor(
    private auth: AuthService, 
    private toastService: ToastService, 
    private customerInfo: CustomerWorkreportInfoService, 
    private memberInfo: MemberInfoService, 
    private route: ActivatedRoute, 
    private router: Router,
    private transportServ: TransportationExpenseService,) { }

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
      
    }, 3000);
  }

  getWorkReportData() {
    this.postData.member_id = this.authUser.email;
    
   // console.log(this.postData + "mingalar");
   if (this.postData.member_id) {
      this.memberInfo.memberData(this.postData).subscribe(
        (res: any) => {
          //console.log(res); //refresh data
          this.data = res;

          this.memberInfo.changeMemberData(res);
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
    this.postData.member_id = this.authUser.email;
    //console.log(this.postData.month + " login");
    //search by date again
    this.customerInfo.getcustomerData(this.postData).subscribe( (res: any) => {
      this.newData = res;
      //console.log(this.newData.customer_work_report);
      this.customerInfo.updateCustomerData(res);

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

  goMoreInfoClient(urls: String) {
    this.postData.member_id = this.authUser.email;
    //search by date again
    this.customerInfo.getcustomerData(this.postData).subscribe( (res: any) => {
      this.newData = res;
      this.customerWorkReport = res.customer_work_report[0];
      this.clientRpFlg = res.customer_work_report;
      this.workingPattern = res.project_info.working_hour;
      this.workingHour = res.work_report;
  
      console.log(this.newData.project_info);
      this.customerInfo.updateCustomerData(res);

      let navigationExtras: NavigationExtras = {
        state: {
          special: this.newData.project_info,
          clientrpflg: this.clientRpFlg,
          workingPattern: this.workingPattern,
          workingHour: this.workingHour,
          year: this.postData.year,
          month: this.postData.month
        }
      }; 
    
      this.router.navigate([urls], navigationExtras);
    });
  }

  goMoreInfoWorkReport(urls: String) {
    this.postData.member_id = this.authUser.email;
    //console.log(this.postData.month + " login");
    //search by date again
    this.customerInfo.getcustomerData(this.postData).subscribe( (res: any) => {

      this.wkreport_detail = res.work_report_detail;
      this.wkReport = res.work_report;
      this.workPattern = res.project_info.working_hour;
      this.wkreport_detail_date = res.work_report_detail[0]['report_date'];
  
      this.customerInfo.updateCustomerData(res);

      let navigationExtras: NavigationExtras = {
        state: {
          special: this.wkreport_detail,
          wkReport: this.wkReport,
          workPattern: this.workPattern,
          wkreport_detail_date: this.wkreport_detail_date,
          workingHour: this.workingHour,
          year: this.postData.year,
          month: this.postData.month
        }
      };
    
      this.router.navigate([urls], navigationExtras);
    });
  }

  goMoreInfoTranExp(urls: String) {
    this.postData.member_id = this.authUser.email;
    //console.log(this.postData.month + " login");
    //search by date again
    this.customerInfo.getcustomerData(this.postData).subscribe( (res: any) => {
      this.newData = res;
      //console.log(this.newData.customer_work_report);
      this.customerInfo.updateCustomerData(res);

      let navigationExtras: NavigationExtras = {
        state: {
          special: this.newData.transport_expense,
          year: this.postData.year,
          month: this.postData.month
        }
      };
    
      this.router.navigate([urls], navigationExtras);
    });
    /* this.postData.member_id = this.authUser.email;
    //console.log(this.postData.month + " login");
    //search by date again
    this.transportServ.transportExpenseData(this.postData).subscribe( (res: any) => {
      this.tranSportExpense = res;
      //console.log(this.tranSportExpense.transport_expense);
      console.log(this.postData); 
      this.transportServ.updateTransportExpense(res);

      let navigationExtras: NavigationExtras = {
        state: {
          special: res.transport_expense,
          year: this.postData.year,
          month: this.postData.month
        }
      };
    
      this.router.navigate([urls], navigationExtras);
    }); */
    
  }

  unread() {

  }

}

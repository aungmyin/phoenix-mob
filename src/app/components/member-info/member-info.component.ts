import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MemberInfoService } from 'src/app/services/member-info.service';
import { CustomerWorkreportInfoService } from 'src/app/services/customer-workreport-info.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
})
export class MemberInfoComponent implements OnInit {
  @Input() loginUser: any;

  postData = {
    year: '',
    month: '',
    member_id: '',
    member_info: ''
  }

  panelOpenState = false;

  wReportData: any;
  mbInfo: any;
  memberNo: String;
  fmmemberNo: any;

  items: any = [];
  tran_expen: any = [];
  own_depart: any = [];
  compareTranEx: any;
  itemExpandedHeight: number = 200;
  comp_sName: String;
  memberInfo: any;
  status_dly: String;
  checkBoxList: any;
  tripTypeList: any;
  voucherlist: any;

  newData: any;
  customerWorkReport: any;
  clientRpFlg: any;
  workingPattern: any;
  workingHour: any;
  newDate: any;
  newMonth: any;

  information: any;
  automaticClose: false;
  total:boolean;
  attendance_type: any;
  workPattern: any[];
  workPatternExist: any[];
  workinghour: any;
  tranExpen: any;
  deman_type: any;
  transporation: any;
  customerWorkReportDetail: any;
  newArray: any = [];

  constructor(private authService: AuthService, private customerInfo: CustomerWorkreportInfoService, private memberService: MemberInfoService, private route: ActivatedRoute, private router: Router) { }

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
      //console.log(this.newDate + this.newMonth + "current year");
    }

    //this.postData.member_info = '';
    this.memberService.memberData$.subscribe((res: any) => {
      this.comp_sName = res.company_name_short;
      this.mbInfo = res.member_info;
      this.information = res.work_report_detail;
      this.workPattern = res.project_info;
      this.customerWorkReport =res.customer_work_report;

      //this.customerWorkReportDetail = res.customer_work_report.customer_workreport_items;

      //transporation expense
      this.tranExpen = res.transport_expense;

      console.log(this.customerWorkReport);

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

    this.deman_type = [
      {
        id: 0,
        value: 'in house'
      },
      {
        id: 1,
        value: 'Customer'
      }
    ];

    this.transporation = [
      {
        id: 0,
        value: '-'
      },
      {
        id: 1,
        value: 'Bus'
      },
      {
        id: 2,
        value: 'Train'
      },
      {
        id: 3,
        value: 'Taxi'
      },
      {
        id: 4,
        value: 'Air plane'
      },
      {
        id: 5,
        value: 'Other'
      }
    ];

    this.checkBoxList = [
      { val: 'Work hour not entered', isChecked: false },
      { val: 'Weekend', isChecked: false },
      { val: 'All', isChecked: true }
    ];


    this.attendance_type = [
      {
        id: 0,
        value: '-'
      },
      {
        id: 1,
        value: 'Public Holiday'
      },
      {
        id: 2,
        value: 'Shift Holiday'
      },
      {
        id: 3,
        value: 'Paid Holiday'
      },
      {
        id: 4,
        value: 'Half Holiday'
      },
      {
        id: 5,
        value: 'ABSENCE'
      },
      {
        id: 6,
        value: 'Delay'
      },
      {
        id: 7,
        value: 'Early'
      },
      {
        id: 8,
        value: 'Special Holiday'
      },
      {
        id: 9,
        value: 'Holiday Work'
      },
      {
        id: 10,
        value: 'Substitute Holiday'
      },
      {
        id: 11,
        value: 'Others'
      }
    ];


    this.own_depart = [
      { id: 0,
        value: 'Not prducted'
      },
      { id: 1,
        value: 'Not applied'
      },
      { id: 2,
        value: 'Applied'
      },
      { id: 3,
        value: 'Remand'
      },
      { id: 4,
        value: 'Accepted'
      }
    ]

  }

  toggleSection(index) {
    this.information[index].open = !this.information[index].open;
  }

  toggleSectionCustomer(index) {
    this.customerWorkReportDetail[index].open = !this.customerWorkReportDetail[index].open;
  }

  toggleSection2(index) {
    this.tranExpen[index].open = !this.tranExpen[index].open;
  }

  toggleSectionc() {
    this.customerWorkReport.open = !this.customerWorkReport.open;
  }

  memberNoFormat(mbno: Number) {
    if( mbno < 10 ) {
      this.fmmemberNo = "000" + mbno;
    } else if (mbno < 100) {
      this.fmmemberNo = "00" + mbno;
    } else if (mbno < 1000) {
      this.fmmemberNo = "0" + mbno;
    } else {
      this.fmmemberNo = mbno;
    }

    return this.fmmemberNo;
  }

  statusDly(status: Number) {
    if (status == 0) {
      this.status_dly = "Not prducted";
    } else if (status == 1) {
      this.status_dly = "Not applied";
    } else if (status == 2) {
      this.status_dly = "Applied";
    } else if (status == 3) {
      this.status_dly = "Remand";
    } else if (status == 4) {
      this.status_dly = "Accepted";
    } else {
      this.status_dly = "-";
    }
  }

  isWeekEnd(wkday: any) {
    var date = new Date(wkday);
    return date.getDay() === 6 || date.getDay() === 0;
  }


  goMoreInfoClient(urls: String) {
    this.postData.member_id = this.loginUser.email;
    console.log(this.postData);
    //search by date again
    this.customerInfo.getcustomerData(this.postData).subscribe( (res: any) => {
      this.newData = res;
      this.customerWorkReport = res.customer_work_report[0];
      this.clientRpFlg = res.customer_work_report;
      this.workingPattern = res.project_info.working_hour;
      this.workingHour = res.work_report;
  
     // console.log(this.newData.project_info);
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


  /* getMemberDetailByEmpID() {
    console.log(this.loginUser);
    this.postData.member_id = this.loginUser.email;
    console.log(this.postData + "mb info");
    this.memberService.memberData( this.postData ).subscribe( (res: any) => {
     console.log(res);
      this.mbInfo = res.member_info;
     
      this.memberNo = this.mbInfo.member_no;
      
      
      //console.log(this.memberNo.toString().length);

      this.compareTranEx = this.mbInfo['dairy_transrate_flg'];

    });
  } */

  

}

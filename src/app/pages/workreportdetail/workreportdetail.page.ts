import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-workreportdetail',
  templateUrl: './workreportdetail.page.html',
  styleUrls: ['./workreportdetail.page.scss'],
})
export class WorkreportdetailPage implements OnInit {

  postData = {
    year: '2020',
    month: '5',
    workreport_id: '29558',
    member_id: '',
    totalWH: '',
    totalOverTime: '',
    totalNight: '',
    totalDeduct: '',
    rstWH: '',
    rstOvt: '',
    rstOvtPay: '',
    rstNgWH: '',
    rstDeHr: '',
    rstPaidHld: '',
    rstPaidHfHld: '',
    rstTotal: '',
    rstAbsDay: '',
    rstCloseDate: '',
  }

  wkreport_detail: any;
  wkreport_detail_date: Date;
  wkReport: any;
  attendance_type: any = [];
  workPattern: any;

  displayUserData: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( (res: any) => {
      this.displayUserData = res;
    });

    this.getWorkReportDetailByEmpID();

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
  }

  getWorkReportDetailByEmpID() {
    this.postData.member_id = this.displayUserData['email'];
    
    this.authService.getWorkReportDetail( this.postData ).subscribe( (res: any) => {
      //console.log(res);
      this.wkreport_detail = res.work_report_detail;
      this.wkReport = res.work_report;
      this.workPattern = res.project_info.working_hour;
      
      console.log(this.workPattern);
      this.wkreport_detail_date = res.work_report_detail[0]['report_date'];
    });
  }

}

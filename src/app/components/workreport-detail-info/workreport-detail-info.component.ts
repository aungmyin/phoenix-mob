import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WorkreportDetailInfoService } from 'src/app/services/workreport-detail-info.service';

@Component({
  selector: 'app-workreport-detail-info',
  templateUrl: './workreport-detail-info.component.html',
  styleUrls: ['./workreport-detail-info.component.scss'],
})
export class WorkreportDetailInfoComponent implements OnInit {

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
  workPatternExist: any = [];

  displayUserData: any;

  constructor(private authService: AuthService, private wkrpInfoService: WorkreportDetailInfoService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( (res: any) => {
      this.displayUserData = res;
      
      this.getWorkReportDetailByEmpID();
    });


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
    this.postData.member_id = this.displayUserData.email;
    
    this.wkrpInfoService.wkrpDetailData( this.postData ).subscribe( (res: any) => {
      //console.log(res);
      this.wkreport_detail = res.work_report_detail;

      this.wkReport = res.work_report;
      this.workPattern = res.project_info.working_hour;
      
      //to display exist work pattern
      for (let index = 0; index < 6; index++) {
        if(this.workPattern[index]['pattern_flg'] == 1) {
          this.workPatternExist[index] = this.workPattern[index];
        }
      }
      console.log(this.workPatternExist);

      this.wkreport_detail_date = res.work_report_detail[0]['report_date'];
    });
  }

}

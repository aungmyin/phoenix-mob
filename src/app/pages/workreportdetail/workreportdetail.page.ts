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

  displayUserData: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( (res: any) => {
      this.displayUserData = res;
    });

    this.getWorkReportDetailByEmpID();
  }

  getWorkReportDetailByEmpID() {
    this.postData.member_id = this.displayUserData['email'];
    
    this.authService.getWorkReportDetail( this.postData ).subscribe( (res: any) => {
      //console.log(res);
      this.wkreport_detail = res.work_report_detail;
      this.wkReport = res.work_report;
      console.log(this.wkReport);
      this.wkreport_detail_date = res.work_report_detail[0]['report_date'];
    });
  }

}

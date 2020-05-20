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
    month: '6',
    workreport_id: '29558'
  }

  wkreport_detail: any;
  wkreport_detail_date: Date;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getWorkReportDetailByEmpID();
  }

  getWorkReportDetailByEmpID() {
    this.authService.getWorkReportDetail( this.postData ).subscribe( (res: any) => {
      //console.log(res);
      this.wkreport_detail = res.work_report_detail;

      this.wkreport_detail_date = res.work_report_detail[0]['report_date'];
    });
  }

}

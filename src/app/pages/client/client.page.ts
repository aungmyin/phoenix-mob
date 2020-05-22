import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  
  postData = {
    year: '2020',
    month: '5',
    workreport_id: '29558',
    member_id: ''
  }

  project_info: any;
  working_hours: any;

  displayUserData: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( (res: any) => {
       //console.log("hello from client " + res);
       this.displayUserData = res;
     });

    this.getWorkReportDetailByEmpID();
  }

  getWorkReportDetailByEmpID() {
    this.postData.member_id = this.displayUserData['email'];

    this.authService.getWorkReportDetail( this.postData ).subscribe( (res: any) => {
      console.log(res);
      this.project_info = res.customer_work_report;

      //this.working_hours = res.customer_work_report.project_info.working_hour;
    });
  }

}

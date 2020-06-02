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
  workingHour: any;
  workingPattern: any;
  contractTypeName: String;
  indiv_contractid: String;

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
      this.indiv_contractid = res.project_info.project_infos[0];

      this.workingHour = res.work_report;
      this.workingPattern = res.project_info.working_hour;

      console.log(this.workingPattern);
      this.getContractTypeById(res.customer_work_report[0]['client_report_flg']);

      //this.working_hours = res.customer_work_report.project_info.working_hour;
    });
  }

  getContractTypeById(contractId: Number) {
    if( contractId == 1 ) {
      this.contractTypeName = "Monthly Contract";
    } else if ( contractId == 2 ) {
      this.contractTypeName = "Fixed Contract";
    } else if (contractId == 3) {
      this.contractTypeName = "Time Contract";
    } else {
      this.contractTypeName = "";
    }
  }

}

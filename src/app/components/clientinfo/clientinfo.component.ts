import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClientinfoService } from 'src/app/services/clientinfo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientinfo',
  templateUrl: './clientinfo.component.html',
  styleUrls: ['./clientinfo.component.scss'],
})
export class ClientinfoComponent implements OnInit {

  postData = {
    year: '',
    month: '',
    workreport_id: '29558',
    member_id: ''
  }

  project_info: any;
  working_hours: any;

  newDate: any;
  newMonth: any;

  displayUserData: any;
  workingHour: any;
  workingPattern: any;
  contractTypeName: String;
  indiv_contractid: String;

  constructor(private authService: AuthService, private route: ActivatedRoute, private clientInfoService: ClientinfoService) { }

  ngOnInit() {
     //for getting parameters
     this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
      console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }
    
    this.authService.userData$.subscribe( (res: any) => {
      //console.log("hello from client " + res);
      this.displayUserData = res;

      this.getWorkReportDetailByEmpID();
    });

   
  }

  getWorkReportDetailByEmpID() {
    this.postData.member_id = this.displayUserData['email'];

    this.clientInfoService.clientData( this.postData ).subscribe( (res: any) => {
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

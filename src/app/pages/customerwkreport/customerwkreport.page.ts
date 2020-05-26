import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-customerwkreport',
  templateUrl: './customerwkreport.page.html',
  styleUrls: ['./customerwkreport.page.scss'],
})
export class CustomerwkreportPage implements OnInit {

  postData = {
    year: '2020',
    month: '5',
    workreport_id: '29558',
    member_id: '',
    customerName: '',
    projectName: '',
    contractPeriod: '',
    custWkReport: '',
    actWorkHour: '',
    note: ''
  }

  items: any = [];
  tran_expen: any = [];
  report_flgs: any = [];

  compareTranEx: any;
  customerWorkReport: any;
  projectInfo: any;
  displayUserData: any;

  constructor(private authService: AuthService, private toastService: ToastService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( (res: any) => {
      console.log(res + "sustomer");
      this.displayUserData = res;
    });

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

    this.getWorkReportDetailByEmpID();
  }

  getWorkReportDetailByEmpID() {
    this.postData.member_id = this.displayUserData.email;
    
    this.authService.getWorkReportDetail( this.postData ).subscribe( (res: any) => {
      
      this.customerWorkReport = res.customer_work_report[0];
      this.projectInfo = res.project_info.project_infos[0];
      console.log(this.projectInfo);
    },
    (error: any) => {
      this.toastService.presentToast('Network Issue.');
    });
  }

}

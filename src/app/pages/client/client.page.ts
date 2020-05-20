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
    month: '6',
    workreport_id: '29558'
  }

  project_info: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getWorkReportDetailByEmpID();
  }

  getWorkReportDetailByEmpID() {
    this.authService.getWorkReportDetail( this.postData ).subscribe( (res: any) => {
      //console.log(res);
      this.project_info = res.project_info.project_infos;
    });
  }

}

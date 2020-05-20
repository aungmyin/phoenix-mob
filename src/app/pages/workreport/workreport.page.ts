import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-workreport',
  templateUrl: './workreport.page.html',
  styleUrls: ['./workreport.page.scss'],
})
export class WorkreportPage implements OnInit {

  postData = {
    year: '2020',
    month: '6',
    workreport_id: '29558'
  }

  wReportData: any;
  project_info: any;

  items: any = [];
  itemExpandedHeight: number = 200;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getWorkReportDetailByEmpID();

    this.items = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false}
    ]
  }

  expandedItem(item: any) {
    item.expanded = !item.expanded;
  }

  searchWkReportAction() {

  }

  getWorkReportDetailByEmpID() {
    this.authService.getWorkReportDetail( this.postData ).subscribe( (res: any) => {
      console.log(res);
      this.project_info = res.project_info.project_infos;
    });
  }

  unread() {

  }

}

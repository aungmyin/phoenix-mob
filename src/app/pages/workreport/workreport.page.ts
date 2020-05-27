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
    month: '5',
    workreport_id: '29558',
    member_id: ''
  }

  wReportData: any;
  project_info: any;
  wkReportDetail: any;
  mbInfo: any;
  memberNo: String;

  items: any = [];
  tran_expen: any = [];
  own_depart: any = [];
  compareTranEx: any;
  itemExpandedHeight: number = 200;

  displayUserData: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    //for tomorrow
   /* this.route.paramMap.subscribe(params => {
      this.userType = params.get("userType")
    }); */
    this.authService.userData$.subscribe( (res: any) => {
     // console.log("hello from wk " + res.email);
      this.displayUserData = res;
    });

    this.getWorkReportDetailByEmpID();

    this.items = [
      {expanded: false},
      {expanded: false}
    ]

    this.tran_expen = [
      {
        id: 0,
        value: 'No'
      },
      {
        id: 1,
        value: 'Yes'
      }
    ];

    this.own_depart = [
      { id: 0,
        value: 'Not prducted'
      },
      { id: 1,
        value: 'Not applied'
      },
      { id: 2,
        value: 'Applied'
      },
      { id: 3,
        value: 'Remand'
      },
      { id: 4,
        value: 'Accepted'
      }
    ]

  }

  expandedItem(item: any) {
    item.expanded = !item.expanded;
  }

  searchWkReportAction() {

  }

  getWorkReportDetailByEmpID() {
    //console.log(this.displayUserData);
    this.postData.member_id = this.displayUserData['email'];

    this.authService.getWorkReportDetail( this.postData ).subscribe( (res: any) => {
     //console.log(res);
      this.project_info = res.project_info.project_infos;
      this.wkReportDetail = res.work_report_detail;
      this.mbInfo = res.member_info;
     
      this.memberNo = this.mbInfo.member_no;
      
      if( this.memberNo.toString().length == 3 ) {
        this.memberNo = "0" + this.memberNo;
      } else if (this.memberNo.toString().length == 2) {
        this.memberNo = "00" + this.memberNo;
      } else if (this.memberNo.toString().length == 1) {
        this.memberNo = "000" + this.memberNo;
      } else {
        this.memberNo = this.memberNo;
      }
        //console.log(this.memberNo.toString().length);
     

      this.compareTranEx = this.mbInfo['dairy_transrate_flg'];


    });
  }

  unread() {

  }

}

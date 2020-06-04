import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-workreport',
  templateUrl: './workreport.page.html',
  styleUrls: ['./workreport.page.scss'],
})


export class WorkreportPage implements OnInit {

  postData = {
    year: '',
    month: '',
    workreport_id: '29558',
    member_id: ''
  }

  newDate: any;
  newMonth: any;

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

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

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
    console.log(this.postData.year + this.postData.month);
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

  goMoreInfo(urls: String) {
      this.router.navigate([urls], { queryParams: { 'year': this.postData.year, 'month': this.postData.month } });
  }

  unread() {

  }

}

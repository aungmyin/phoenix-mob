import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MemberInfoService } from 'src/app/services/member-info.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
})
export class MemberInfoComponent implements OnInit {
  @Input() loginUser: any;

  postData = {
    year: '',
    month: '',
    member_id: '',
    member_info: ''
  }

  wReportData: any;
  mbInfo: any;
  memberNo: String;
  fmmemberNo: any;

  items: any = [];
  tran_expen: any = [];
  own_depart: any = [];
  compareTranEx: any;
  itemExpandedHeight: number = 200;
  comp_sName: String;
  memberInfo: any;
  status_dly: String;

  constructor(private authService: AuthService, private memberService: MemberInfoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //this.postData.member_info = '';
    this.memberService.memberData$.subscribe((res: any) => {
      this.comp_sName = res.company_name_short;
      this.mbInfo = res.member_info;
      //this.statusDly(this.mbInfo);
      console.log(this.mbInfo);
    });


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

  memberNoFormat(mbno: Number) {
    if( mbno < 10 ) {
      this.fmmemberNo = "000" + mbno;
    } else if (mbno < 100) {
      this.fmmemberNo = "00" + mbno;
    } else if (mbno < 1000) {
      this.fmmemberNo = "0" + mbno;
    } else {
      this.fmmemberNo = mbno;
    }

    return this.fmmemberNo;
  }

  statusDly(status: Number) {
    if (status == 0) {
      this.status_dly = "Not prducted";
    } else if (status == 1) {
      this.status_dly = "Not applied";
    } else if (status == 2) {
      this.status_dly = "Applied";
    } else if (status == 3) {
      this.status_dly = "Remand";
    } else if (status == 4) {
      this.status_dly = "Accepted";
    } else {
      this.status_dly = "-";
    }
  }


  /* getMemberDetailByEmpID() {
    console.log(this.loginUser);
    this.postData.member_id = this.loginUser.email;
    console.log(this.postData + "mb info");
    this.memberService.memberData( this.postData ).subscribe( (res: any) => {
     console.log(res);
      this.mbInfo = res.member_info;
     
      this.memberNo = this.mbInfo.member_no;
      
      
      //console.log(this.memberNo.toString().length);

      this.compareTranEx = this.mbInfo['dairy_transrate_flg'];

    });
  } */

  

}

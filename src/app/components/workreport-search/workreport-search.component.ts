import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MemberInfoService } from 'src/app/services/member-info.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-workreport-search',
  templateUrl: './workreport-search.component.html',
  styleUrls: ['./workreport-search.component.scss'],
})
export class WorkreportSearchComponent implements OnInit {
  
  @Input() loginUser: any;

  postData = {
    year: '',
    month: '',
    member_id: '',
    token: ''
  }

  newDate: any;
  newMonth: any;

  authUser: any;

  project_info: any;
  wkReportDetail: any;
  mbInfo: any;
  memberNo: any;
  compareTranEx: any;
  yearlist: any = [];
  monthlist: any = [];

  constructor(private route: ActivatedRoute, private auth: AuthService, private toastService: ToastService, private router: Router, private memberService: MemberInfoService) { }

  ngOnInit() {
    //console.log(this.loginUser + "wkrp search");
    //for getting parameters
    this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
      //console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year || this.postData.year.length == 0) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }

    this.yearlist = [
      { id: 0,
        value: 2010
      },
      { id: 1,
        value: 2011
      },
      { id: 2,
        value: 2012
      },
      { id: 3,
        value: 2013
      },
      { id: 4,
        value: 2014
      },
      { id: 5,
        value: 2015
      },
      { id: 6,
        value: 2016
      },
      { id: 7,
        value: 2017
      },
      { id: 8,
        value: 2018
      },
      { id: 9,
        value: 2019
      },
      { id: 10,
        value: 2020
      },
      { id: 11,
        value: 2021
      },
      { id: 12,
        value: 2022
      },
      { id: 13,
        value: 2023
      },
      { id: 14,
        value: 2024
      },
      { id: 15,
        value: 2025
      },
      { id: 16,
        value: 2026
      },
      { id: 17,
        value: 2027
      },
      { id: 18,
        value: 2028
      },
      { id: 19,
        value: 2029
      },
      { id: 20,
        value: 2030
      }
    ];

    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
     // console.log(this.authUser);
    });

    this.monthlist = [
      { id: 1,
        value: 1
      },
      { id: 2,
        value: 2
      },
      { id: 3,
        value: 3
      },
      { id: 4,
        value: 4
      },
      { id: 5,
        value: 5
      },
      { id: 6,
        value: 6
      },
      { id: 7,
        value: 7
      },
      { id: 8,
        value: 8
      },
      { id: 9,
        value: 9
      },
      { id: 10,
        value: 10
      },
      { id: 11,
        value: 11
      },
      { id: 12,
        value: 12
      }
    ];

 }

  searchWkReportAction() {
    this.postData.member_id = this.loginUser['email'];
    this.postData.token = this.loginUser['access-token'];
    console.log(this.postData);
    if(this.validateInputs()) {
      this.memberService.memberData(this.postData).subscribe( (res: any) => {
        console.log(res.member_info);
        this.memberService.updateMemberData(res);
      })
    } else {
      this.toastService.presentToast("date can't empty");
    }

    this.router.navigate(['/home/workreport'], { queryParams: { 'year': this.postData.year, 'month': this.postData.month } });
    
    
  }

  
  validateInputs() {
    
    return (
      this.postData.year && 
      this.postData.month
    );
  }

  formatMemberNo(mbno: any) {
    if( this.memberNo.toString().length == 3 ) {
      this.memberNo = "0" + this.memberNo;
    } else if (this.memberNo.toString().length == 2) {
      this.memberNo = "00" + this.memberNo;
    } else if (this.memberNo.toString().length == 1) {
      this.memberNo = "000" + this.memberNo;
    } else {
      this.memberNo = this.memberNo;
    }

    return this.memberNo;
  }

  getMemberDetailByEmpID() {
    
    this.postData.member_id = this.authUser.email;
    this.project_info ='';
    console.log(this.postData);
    this.memberService.memberData( this.postData ).subscribe( (res: any) => {
      console.log(res);
      this.project_info = res.project_info.project_infos;
      this.wkReportDetail = res.work_report_detail;
      this.mbInfo = res.member_info;
      
      this.formatMemberNo(this.mbInfo.member_no);
      //console.log(this.memberNo.toString().length);

      this.compareTranEx = this.mbInfo['dairy_transrate_flg'];

    });
  }

}

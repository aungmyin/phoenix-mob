import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workreportdetail',
  templateUrl: './workreportdetail.page.html',
  styleUrls: ['./workreportdetail.page.scss'],
})
export class WorkreportdetailPage implements OnInit {

  postData = {
    year: '',
    month: '',
    member_id: '',
    totalWH: '',
    totalOverTime: '',
    totalNight: '',
    totalDeduct: '',
    rstWH: '',
    rstOvt: '',
    rstOvtPay: '',
    rstNgWH: '',
    rstDeHr: '',
    rstPaidHld: '',
    rstPaidHfHld: '',
    rstTotal: '',
    rstAbsDay: '',
    rstCloseDate: '',
  }

  wkreport_detail: any;
  wkreport_detail_date: Date;
  wkReport: any;
  attendance_type: any = [];
  workPattern: any;
  workPatternExist: any = [];
  workingHour: any;
  newDate: any;
  newMonth: any;

  displayUserData: any;

  constructor(private authService: AuthService, 
    private route: ActivatedRoute,
    private router: Router
    ) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.wkreport_detail = this.router.getCurrentNavigation().extras.state.special;
        this.wkReport = this.router.getCurrentNavigation().extras.state.wkReport;
        this.workPattern = this.router.getCurrentNavigation().extras.state.workPattern;
        this.workingHour = this.router.getCurrentNavigation().extras.state.workingHour;
        this.wkreport_detail_date = this.router.getCurrentNavigation().extras.state.wkreport_detail_date;
        this.postData.year = this.router.getCurrentNavigation().extras.state.year;
        this.postData.month = this.router.getCurrentNavigation().extras.state.month;

        //to display exist work pattern
      for (let index = 0; index < 6; index++) {
        if(this.workPattern[index]['pattern_flg'] == 1) {
          this.workPatternExist[index] = this.workPattern[index];
        }
      }
      //console.log(this.workPatternExist);

      }
    });

   }

  ngOnInit() {
    
    if(!this.postData.year || this.postData.year.length == 0) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }

    this.attendance_type = [
      {
        id: 0,
        value: '-'
      },
      {
        id: 1,
        value: 'Public Holiday'
      },
      {
        id: 2,
        value: 'Shift Holiday'
      },
      {
        id: 3,
        value: 'Paid Holiday'
      },
      {
        id: 4,
        value: 'Half Holiday'
      },
      {
        id: 5,
        value: 'ABSENCE'
      },
      {
        id: 6,
        value: 'Delay'
      },
      {
        id: 7,
        value: 'Early'
      },
      {
        id: 8,
        value: 'Special Holiday'
      },
      {
        id: 9,
        value: 'Holiday Work'
      },
      {
        id: 10,
        value: 'Substitute Holiday'
      },
      {
        id: 11,
        value: 'Others'
      }
    ];

   // console.log(this.attendance_type);

  }

  

}

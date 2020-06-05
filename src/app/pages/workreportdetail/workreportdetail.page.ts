import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

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

  displayUserData: any;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    //for getting parameters
    this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
      console.log(this.postData.year + this.postData.month + " parameter");
    });

    this.authService.userData$.subscribe( (res: any) => {
      this.displayUserData = res;
    });

  }

  

}

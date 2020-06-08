import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberInfoService } from 'src/app/services/member-info.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-workreport-search',
  templateUrl: './workreport-search.component.html',
  styleUrls: ['./workreport-search.component.scss'],
})
export class WorkreportSearchComponent implements OnInit {
  

  postData = {
    year: '',
    month: '',
    member_id: '',
    member_info: ''
  }

  displayUserData: any;

  newDate: any;
  newMonth: any;

  project_info: any;
  wkReportDetail: any;
  mbInfo: any;
  memberNo: any;
  compareTranEx: any;

  constructor(private route: ActivatedRoute, private toastService: ToastService, private router: Router, private memberService: MemberInfoService) { }
  @Input() loginUser: any;
  
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
  }

  searchWkReportAction() {
    console.log(this.postData.year + this.postData.month);
    this.router.navigate(['/home/workreport'], { queryParams: { 'year': this.postData.year, 'month': this.postData.month } });
    
    this.workReportUpdateAction();
  }

  

  validateInputs() {
    
    return (
      this.postData.year && 
      this.postData.month
    );
  }

  workReportUpdateAction() {
    this.postData.member_id = this.loginUser.email;
    console.log(this.loginUser + "login");
    if(this.validateInputs()) {
      this.memberService.memberData(this.postData).subscribe( (res: any) => {
        this.postData.member_info = '';
        console.log(res.member_info + "mb data");
        this.memberService.updateMemberData(res.member_info);
      })
    } else {
      this.toastService.presentToast("member info can't empty");
    }
    
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
    //console.log(this.displayUserData);
    this.postData.member_id = this.displayUserData.email;
   // console.log(this.postData + "mb info");
    this.project_info ='';
    this.memberService.memberData( this.postData ).subscribe( (res: any) => {
      //console.log(res);
      this.project_info = res.project_info.project_infos;
      this.wkReportDetail = res.work_report_detail;
      this.mbInfo = res.member_info;
      
      this.formatMemberNo(this.mbInfo.member_no);
      //console.log(this.memberNo.toString().length);

      this.compareTranEx = this.mbInfo['dairy_transrate_flg'];

    });
  }

}

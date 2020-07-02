import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientinfoService } from 'src/app/services/clientinfo.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  
  postData = {
    year: '',
    month: '',
    member_id: ''
  }

  authUser:any;
  newDate: any;
  newMonth: any;

  contractTypeName: String;
  workingHour: any;
  data: any;
  projectInfo: any;
  clientrpflg: any;
  wkPattern: any;
  wkingHour: any;

  constructor(
    private auth: AuthService, 
    private toastService: ToastService, 
    private route: ActivatedRoute, 
    private router: Router,
    private clientService: ClientinfoService) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.projectInfo = this.router.getCurrentNavigation().extras.state.special;
          this.clientrpflg = this.router.getCurrentNavigation().extras.state.clientrpflg;
          this.wkPattern = this.router.getCurrentNavigation().extras.state.workingPattern;
          this.wkingHour = this.router.getCurrentNavigation().extras.state.workingHour;
          this.postData.year = this.router.getCurrentNavigation().extras.state.year;
          this.postData.month = this.router.getCurrentNavigation().extras.state.month;

          this.data = this.projectInfo.project_infos;

          console.log(this.projectInfo);
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

    /* this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      this.getClientData();
    }); */

  }

  getContractTypeById(contractId: Number) {
    if( contractId == 1 ) {
      this.contractTypeName = "Monthly Contract";
    } else if ( contractId == 2 ) {
      this.contractTypeName = "Fixed Contract";
    } else if (contractId == 3) {
      this.contractTypeName = "Time Contract";
    } else {
      this.contractTypeName = "-";
    }
    return this.contractTypeName;
  }
  /* doRefresh(event) {
    console.log('Begin async operation');
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      this.getClientData();
      event.target.complete();
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      
    }, 3000);
  } */

  /* getClientData() {
    this.postData.member_id = this.authUser.email;
    
    //console.log(this.postData);
   if (this.postData.member_id) {
      this.clientService.clientData(this.postData).subscribe(
        (res: any) => {
          console.log(res.project_info); //refresh data
          this.clientService.updateClientData(res.project_info);
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );

    } else {
      this.toastService.presentToast("loading ...");
    }

    //this.ngOnInit();
  } */

}

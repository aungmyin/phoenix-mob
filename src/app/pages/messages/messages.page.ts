import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  listItems: any;

  postData = {
    year: '',
    month: '',
    member_id: ''
  }

  authUser: any;

  activeMenu: String;

  public UserProfile: any;
  memberNo: any;
  fmmemberNo: String;
  author_type: any = [];
  authorityName: String;
  empTypeName: String;
  empStatusName: String;

  constructor(private httpService: HttpService, private router: Router, private authService: AuthService, private menu: MenuController) { 
    this.listItems = [  
      'Java',   
      'Python',  
      'Node.js',  
      'Android',  
      'React.js',  
      'HTML',
      'PHP', 
      'C++'  
    ];  

   }

  ngOnInit() {
    this.authService.userData$.subscribe((res: any) => {
      this.authUser = res;
      this.getCurrentUserProfile();
    });

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.authService.userData$.subscribe((res: any) => {
      this.authUser = res;
      this.getCurrentUserProfile();
      event.target.complete();
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      
    }, 3000);
  }

  onRenderItems(event) {  
    console.log(`Move item from ${event.detail.from} to ${event.detail.to}`);   
    const draggedItem = this.listItems.splice(event.detail.from, 1)[0];  
    this.listItems.splice(event.detail.to, 0, draggedItem);   
    event.detail.complete();  
  }  

  getList() {  
    console.table(this.listItems);   
  }

  getCurrentUserProfile() {
    this.postData.member_id = this.authUser.email;
    console.log(this.postData);
    this.authService.getUserDatail( this.authUser.email ).subscribe( (res: any) => {
      //console.log(res.show_detail);
      this.UserProfile = res.show_detail;

      this.memberNo = this.UserProfile.member_no;

      this.memberNoFormat(this.memberNo);

      this.authority(this.UserProfile.authority_type);

      this.employmentType(this.UserProfile.employment_type);

      this.employmentStatus(this.UserProfile.employment_status);

    } );
  }

  memberNoFormat(mbno: String) {
    if( mbno.toString().length == 3 ) {
      this.fmmemberNo = "0" + mbno;
    } else if (mbno.toString().length == 2) {
      this.fmmemberNo = "00" + mbno;
    } else if (mbno.toString().length == 1) {
      this.fmmemberNo = "000" + mbno;
    } else {
      this.fmmemberNo = mbno;
    }
  }

  authority(authId: Number) {
    if(authId == 2) {
      this.authorityName = "Admin User";
    } else if(authId == 3) {
      this.authorityName = "Manage User";
    } else if(authId == 4) {
      this.authorityName = "Basic User";
    } else {
      this.authorityName = "";
    }
  }

  employmentType(empId: Number) {
    if(empId == 0) {
      this.empTypeName = "Executives";
    } else if(empId == 1) {
      this.empTypeName = "Regular Employees";
    } else if(empId == 2) {
      this.empTypeName = "Contract Employees";
    } else if(empId == 3) {
      this.empTypeName = "Part Time";
    } else if(empId == 4) {
      this.empTypeName = "Side Job";
    } else {
      this.empTypeName = "";
    }
  }

  employmentStatus(empStatus: Number) {
    if(empStatus == 1) {
      this.empStatusName = "Enrolled";
    } else if(empStatus == 2) {
      this.empStatusName = "Suspended";
    } else if(empStatus == 3) {
      this.empStatusName = "Retired";
    } else {
      this.empStatusName = "";
    }
  }

 
  changePasswordAction() {
    this.router.navigate(['changepassword']);
  }
  

}

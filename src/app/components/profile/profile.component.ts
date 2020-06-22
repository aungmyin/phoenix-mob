import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Input() loginUser: any;

  activeMenu: String;

  displayUserData: any;

  UserProfile: any;
  memberNo: String;
  fmmemberNo: String;
  author_type: any = [];
  authorityName: String;
  empTypeName: String;
  empStatusName: String;

  constructor(private profileService: ProfileService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( (res: any) => {
      //console.log(res.email);
      this.displayUserData = res;
      this.getCurrentUserProfile();
    });

    this.authority(this.loginUser);
  }

  getCurrentUserProfile() {

     //console.log(this.displayUserData.email + "user id");
     this.profileService.profileData(this.displayUserData.email).subscribe( (res: any) => {
        //console.log(res.show_detail);
        this.UserProfile = res.show_detail;
        //member no format
        this.memberNoFormat(this.UserProfile.member_no);
        // authority type display text
        this.authority(this.UserProfile.authority_type);
        // employment type display by text
        this.employmentType(this.UserProfile.employment_type);
        //employment status display by text dfdf
        this.employmentStatus(this.UserProfile.employment_status);

     });

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
    this.router.navigate(['home/changepassword']);
  }

}

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

  displayUserData: any;

  activeMenu: String;

  public UserProfile: any;
  memberNo: String;

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
    this.authService.userData$.subscribe( (res: any) => {
      console.log(res.email);
      this.displayUserData = res;
    });

    this.getCurrentUserProfile();

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
   // console.log(this.displayUserData.email);
    this.authService.getUserDatail( this.displayUserData.email ).subscribe( (res: any) => {
      console.log(res.show_detail);
      this.UserProfile = res.show_detail;

      this.memberNo = this.UserProfile.member_no;

      if( this.memberNo.toString().length == 3 ) {
        this.memberNo = "0" + this.memberNo;
      } else if (this.memberNo.toString().length == 2) {
        this.memberNo = "00" + this.memberNo;
      } else if (this.memberNo.toString().length == 1) {
        this.memberNo = "000" + this.memberNo;
      } else {
        this.memberNo = this.memberNo;
      }
    } );
  }

 
  changePasswordAction() {
    this.router.navigate(['changepassword']);
  }
  

}

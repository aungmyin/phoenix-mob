import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  listItems: any;

  displayUserData: any;

  public UserProfile: any;

  constructor(private httpService: HttpService, private authService: AuthService) { 
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
    } );
  }

  

}

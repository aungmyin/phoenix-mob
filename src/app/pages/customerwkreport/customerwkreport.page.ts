import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customerwkreport',
  templateUrl: './customerwkreport.page.html',
  styleUrls: ['./customerwkreport.page.scss'],
})
export class CustomerwkreportPage implements OnInit {

  postData = {
    year: '',
    month: '',
    member_id: ''
  }

  newDate: any;
  newMonth: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //for getting parameters
    this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
      console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year || this.postData.year.length == 0) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }
  }


}

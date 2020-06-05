import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-workreport',
  templateUrl: './workreport.page.html',
  styleUrls: ['./workreport.page.scss'],
})


export class WorkreportPage implements OnInit {

  postData = {
    year: '',
    month: '',
    member_id: ''
  }

  newDate: any;
  newMonth: any;


  items: any = [];
  tran_expen: any = [];
  yeardropdown: any = [];
  yearlist: any = [];
  compareTranEx: any;
  itemExpandedHeight: number = 200;

  displayUserData: any;

  constructor(private authService: AuthService, private httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //for getting parameters
    this.route.queryParams.subscribe(params => {
      this.postData.year = params["year"];
      this.postData.month = params["month"];
      console.log(this.postData.year + this.postData.month + " parameter");
    });

    if(!this.postData.year) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }

    this.items = [
      {expanded: false},
      {expanded: false}
    ]

    this.tran_expen = [
      {
        id: 0,
        value: 'No'
      },
      {
        id: 1,
        value: 'Yes'
      }
    ];


  }

  expandedItem(item: any) {
    item.expanded = !item.expanded;
  }

  goMoreInfo(urls: String) {
      this.router.navigate([urls], { queryParams: { 'year': this.postData.year, 'month': this.postData.month } });
  }

  unread() {

  }

}

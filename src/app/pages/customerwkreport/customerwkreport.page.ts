import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customerwkreport',
  templateUrl: './customerwkreport.page.html',
  styleUrls: ['./customerwkreport.page.scss'],
})
export class CustomerwkreportPage implements OnInit {

  postData = {
    customerName: '',
    projectName: '',
    contractPeriod: '',
    custWkReport: '',
    actWorkHour: '',
  }

  items: any = [];
  tran_expen: any = [];

  compareTranEx: any;

  constructor() { }

  ngOnInit() {
    this.items = [
      {expanded: false},
      {expanded: false}
    ]
  }

}

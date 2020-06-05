import { Component, Renderer2, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transportationexpenses',
  templateUrl: './transportationexpenses.page.html',
  styleUrls: ['./transportationexpenses.page.scss'],
})
export class TransportationexpensesPage implements OnInit {

  postData = {
    year: '',
    month: '',
    tran_date: '',
    member_id: '',
    totalAmount: '',
    customerBilling: ''
  }

  tranSportExpense: any;
  displayUserData: any;
  
  tran_expen: any = [];
  transport_expen: any = [];
  demend_types: any = [];
  print_flgs: any = [];
  compareTranEx: any;

  newDate: any;
  newMonth: any;

  @ViewChild('addtable', {static: false}) table: ElementRef;

  constructor(private authService: AuthService, private route: ActivatedRoute, private renderer: Renderer2) { }

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

    this.authService.userData$.subscribe( (res: any) => {
     //console.log("hello Transport " + res.email);
      this.displayUserData = res;
    });

    
  }

  

}

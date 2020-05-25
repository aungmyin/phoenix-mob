import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transportationexpenses',
  templateUrl: './transportationexpenses.page.html',
  styleUrls: ['./transportationexpenses.page.scss'],
})
export class TransportationexpensesPage implements OnInit {

  postData = {
    tran_date: '',
    member_id: '',
    totalAmount: '',
    customerBilling: ''
  }

  tranSportExpense: any;
  displayUserData: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( (res: any) => {
      this.displayUserData = res;
    });
  }

  getTransporationExpen() {
    this.postData.member_id = this.displayUserData['email'];
    
    this.authService.getWorkReportDetail( this.postData ).subscribe( (res: any) => {
      //console.log(res);
      this.tranSportExpense = res.transport_expense;
      console.log(this.tranSportExpense);
    });
  }

}

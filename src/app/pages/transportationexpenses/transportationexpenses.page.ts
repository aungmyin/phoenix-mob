import { Component, Renderer2, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransportationExpenseService } from 'src/app/services/transportation-expense.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-transportationexpenses',
  templateUrl: './transportationexpenses.page.html',
  styleUrls: ['./transportationexpenses.page.scss'],
})
export class TransportationexpensesPage implements OnInit {
  
  public authUser: any;

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
  newData: any;

  @ViewChild('addtable', {static: false}) table: ElementRef;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private transportServ: TransportationExpenseService, 
    private toastService: ToastService,
    private renderer: Renderer2) {
      this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tranSportExpense = this.router.getCurrentNavigation().extras.state.special;
        this.postData.year = this.router.getCurrentNavigation().extras.state.year;
        this.postData.month = this.router.getCurrentNavigation().extras.state.month;

      console.log(this.tranSportExpense);
      }
    });
  }

  ngOnInit() {
    //for getting parameters
    if(!this.postData.year || this.postData.year.length == 0) {
      this.newDate = new Date().getFullYear();
      this.newMonth = new Date().getMonth();
      this.postData.year = this.newDate;
      this.postData.month = this.newMonth + 1;
     // console.log(this.newDate + this.newMonth + "current year");
    }

    /* this.authService.userData$.subscribe((res: any) => {
      this.authUser = res;
      this.getTransportData();
    }); */
    
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.authService.userData$.subscribe( (res: any) => {
      //console.log("hello Transport " + res.email);
       this.getTransportData();
       event.target.complete();
     });
    setTimeout(() => {
      console.log('Async operation has ended');
      
    }, 3000);
  }

  getTransportData() {
    this.postData.member_id = this.authUser.email;
    
    console.log(this.postData);
   if (this.postData.member_id) {
    //console.log(this.postData.member_id + "mb id have exist");
      this.transportServ.transportExpenseData(this.postData).subscribe(
        (res: any) => {
          //console.log(res.transport_expense); //refresh data
          this.transportServ.updateTransportExpense(res.transport_expense);
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );

    } else {
      this.toastService.presentToast("loading ...");
    }
  }

  removeAction() {
    console.log("remove");
  }

  storeAction() {
    console.log("store action");
  }

  addAction() {
    let count = 0;
    let currentDate = new Date();
    console.log("add html");
    this.compareTranEx = this.tran_expen;
    const p: HTMLElement = this.renderer.createElement('tr');
    p.className = "aClassName"+count;
    p.innerHTML = "<td ><ion-datetime value='"+currentDate+"' displayFormat='dd-MM-YYYY' ></ion-datetime></td>";
    p.innerHTML += "<td ><ion-input type='text' name='destination' ></ion-input></td>";
    p.innerHTML += "<td ><ion-select name='selectone' value='1' placeholder='Select One'><ion-select-option value='1' selected>Bus</ion-select-option><ion-select-option value='2'>Train</ion-select-option><ion-select-option value='3'>Taxi</ion-select-option><ion-select-option value='4'>Air Plane</ion-select-option><ion-select-option value='5'>Other</ion-select-option></ion-select></td>";
    p.innerHTML += "<td ><ion-input type='text' name='destination' ></ion-input></td>";
    p.innerHTML += "<td ><ion-input type='text' name='destination' ></ion-input></td>";
    p.innerHTML += "<td ><ion-select name='rourte_type' value='1' placeholder='Select One'><ion-select-option value='1' selected>One-way</ion-select-option><ion-select-option value='2'>Round-Trip</ion-select-option></ion-select></td>";
    p.innerHTML += "<td ><ion-select name='print_flg' value='1' placeholder='Select One'><ion-select-option value='1' selected>No</ion-select-option><ion-select-option value='2'>Yes</ion-select-option></ion-select></td>";
    p.innerHTML += "<td ><ion-input type='text' name='destination' ></ion-input></td>";
    p.innerHTML += "<td ><ion-select name='demand_type' value='1' placeholder='Select One'><ion-select-option value='1' selected>in house</ion-select-option><ion-select-option value='2'>Customer</ion-select-option></ion-select></td>";
    p.innerHTML += "<td ><ion-button expand='block' share='round' style='margin: 10px' color='warning' (click)='removeAction()' >Remove</ion-input></td>";
    this.renderer.appendChild(this.table.nativeElement, p);
    
  }

}

import { Component, Renderer2, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TransportationExpenseService } from 'src/app/services/transportation-expense.service';

@Component({
  selector: 'app-transportation-expense',
  templateUrl: './transportation-expense.component.html',
  styleUrls: ['./transportation-expense.component.scss'],
})
export class TransportationExpenseComponent implements OnInit {

  postData = {
    year: '2020',
    month: '05',
    workreport_id: '29558',
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

  @ViewChild('addtable', {static: false}) table: ElementRef;

  constructor(private authService: AuthService, private renderer: Renderer2, private transportService: TransportationExpenseService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( (res: any) => {
      console.log("hello Transport " + res.email);
       this.displayUserData = res;
 
       this.getTransporationExpen();
     });
 
     this.tran_expen = [
       {
         id: 0,
         value: 'One-Way'
       },
       {
         id: 1,
         value: 'Round-Trip'
       }
     ];
 
     this.demend_types = [
       {
         id: 0,
         value: 'in house'
       },
       {
         id: 1,
         value: 'customer'
       }
     ];
 
     this.print_flgs = [
       {
         id: 0,
         value: 'No'
       },
       {
         id: 1,
         value: 'Yes'
       }
     ];
 
     this.transport_expen = [
       {
         id: 0,
         value: '-'
       },
       {
         id: 1,
         value: 'Bus'
       },
       {
         id: 2,
         value: 'Train'
       },
       {
         id: 3,
         value: 'Taxi'
       },
       {
         id: 4,
         value: 'Air Plane'
       },
       {
         id: 5,
         value: 'Other'
       }
     ];
 
  }

  getTransporationExpen() {
    this.postData.member_id = this.displayUserData['email'];
    console.log(this.postData + "Post Datas");
    this.transportService.transportExpenseData( this.postData ).subscribe( (res: any) => {
      console.log(res);
      this.tranSportExpense = res.transport_expense;
      console.log(this.tranSportExpense);
    });
  }

  storeAction() {

  }

  removeAction() {
    console.log("remove");
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

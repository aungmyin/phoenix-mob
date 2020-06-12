import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TransportationExpenseService {

  transportExpenseData$ = new BehaviorSubject<any>(['']);

  constructor(private httpService: HttpService) { }

  changeTransportData(data: any) {
    this.transportExpenseData$.next(data);
  }
  transportExpenseData(data: any) {
    console.log(data);
    return this.httpService.getWorkReportDetail("basic_user/basic_user_workreport_detail", data);
  }

  updateTransportExpense(newdata: any) {
    this.changeTransportData(newdata);
  }

}

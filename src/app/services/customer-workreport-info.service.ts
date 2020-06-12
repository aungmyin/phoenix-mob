import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerWorkreportInfoService {

  customerData$ = new BehaviorSubject<any>(['']);

  constructor(private httpService: HttpService) { }

  changeCustomerData(data: any) {
    //console.log(data);
    this.customerData$.next(data);
  }

  getcustomerData(data: any): Observable<any> {
    return this.httpService.getWorkReportDetail("basic_user/basic_user_workreport_detail", data);
  }

  updateCustomerData(newdata: any) {
    //console.log(newdata);
    this.changeCustomerData(newdata);
  }

  

}

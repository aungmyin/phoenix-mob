import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ClientinfoService {

  clientData$ = new BehaviorSubject<any>(['']);

  constructor(private httpService: HttpService) { }

  changeClientData(data: any) {
    this.clientData$.next(data);
  }

  clientData(data: any): Observable<any> {
    return this.httpService.getWorkReportDetail("basic_user/basic_user_workreport_detail", data);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ClientinfoService {

  clientData$ = new BehaviorSubject<any>(['']);

  constructor(private httpService: HttpService) { }

  clientData(data: any) {
    return this.httpService.getWorkReportDetail("basic_user/basic_user_workreport_detail", data);
  }
}

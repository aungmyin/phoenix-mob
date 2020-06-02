import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WorkreportDetailInfoService {

  wkrpDetailData$ = new BehaviorSubject<any>(['']);

  constructor(private httpService: HttpService) { }

  wkrpDetailData(data: any) {
    return this.httpService.getWorkReportDetail("basic_user/basic_user_workreport_detail", data);
  }
  
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WorkreportInfoService {

  workReportData$ = new BehaviorSubject<any>(['']);

  constructor(private httpService: HttpService) { }

  changeProfileData(data: any) {
    this.workReportData$.next(data);
  }

  workReportData(userid: any): Observable<any> {
    return this.httpService.getWorkReportDetail("/employee_detail/employee_info", userid);
  }
}

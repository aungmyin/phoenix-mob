import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileData$ = new BehaviorSubject<any>(['']);

  constructor(private httpService: HttpService) { }

  changeProfileData(data: any) {
    this.profileData$.next(data);
  }

  profileData(userid: any): Observable<any> {
    return this.httpService.getUserData("/employee_detail/employee_info", userid);
  }
}

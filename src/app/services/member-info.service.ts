import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MemberInfoService {
  
  memberData$ = new BehaviorSubject<any>(['']);

  constructor(private httpService: HttpService) { }

  //update data
  changeMemberData(data: any) {
    this.memberData$.next(data);
  }

  memberData(data: any) {
    return this.httpService.getWorkReportDetail("basic_user/basic_user_workreport_detail", data);
  }

  //get latest data
  getCurrentMbData() {
    return this.memberData$.getValue();
  }

  updateMemberData(newdata: any) {
    let data = [];
    data.push(newdata);

    let currentMbData = this.getCurrentMbData();
    let newMbUpdateData = data.concat(currentMbData);
    
    this.changeMemberData(newMbUpdateData);
  }
  
}

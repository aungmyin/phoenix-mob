import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService, 
    private storageService: StorageService, 
    private router: Router
  ) {}

  userData$ = new BehaviorSubject<any>(['']);

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      console.log(res);
      this.userData$.next(res);
    })
  }

  getUserDatail(userId: String): Observable<any> {
    return this.httpService.getUserData('/employee_detail/employee_info', userId);
  }

  login(postDate: any): Observable<any> {
    //return this.httpService.post('login', postDate);
    return this.httpService.get('login/uac_login', postDate);
  }

  signup(postDate: any): Observable<any> {
    return this.httpService.post('signup', postDate);
  }

  updatepassword(postDate: any): Observable<any> {
    return this.httpService.getupdatepsw('changepass/chpass', postDate);
  }

  logout() {
    //this.storageService.clear();

    this.storageService.removeItems(AuthConstants.AUTH).then( res => {
      this.userData$.next('');
      this.router.navigate(['']);
    })
  }
}
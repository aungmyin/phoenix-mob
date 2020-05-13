
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(serviceName: string, data: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;
    
    return this.http.post(url, JSON.stringify(data), options);
  }

  get(serviceName: string, data: any) {
    
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + serviceName + "?email=" + data.username + "&password=" + data.password + "&company=" + data.company;

    return this.http.get(url, options);
  }

  getUserData(serviceName: string, data: any) {
    
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: true };
    const url = environment.apiUrl + serviceName + "?member_id=" + data;

    return this.http.get(url, options);
  }


}

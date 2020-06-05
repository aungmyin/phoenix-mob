import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  feedData$ = new BehaviorSubject<any>(['']);

  constructor(private httpService: HttpService ) { }
  //update data
  changeFeedData(data: any) {
    this.feedData$.next(data);
  }
  //get latest data
  getCurrentFeedData() {
    return this.feedData$.getValue();
  }

  deleteFeedData(feedIndex: number) {
    let data = [];
    let currentFeedData = this.getCurrentFeedData();

    currentFeedData.splice(feedIndex, 1);
    let newUpdateData = data.concat(currentFeedData);
    this.changeFeedData(newUpdateData);
  }

  updateFeedData(newFeed: any) {
    let data = [];
    data.push(newFeed);

    let currentFeedData = this.getCurrentFeedData();
    let newFeedUpdateData = data.concat(currentFeedData);
    
    this.changeFeedData(newFeedUpdateData);
  }

  feedData(postData: any): Observable<any> {
    return this.httpService.post("feed", postData);
  }

  feedDelete(postData: any): Observable<any> {
    return this.httpService.post("feedDelete", postData);
  }

  feedUpdate(postData: any): Observable<any> {
    return this.httpService.post("feedUpdate", postData);
  }

}

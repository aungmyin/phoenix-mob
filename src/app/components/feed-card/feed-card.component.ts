import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {
  
  @Input() loginUser: any;

  feedData: any;

  postData = {
    user_id: "",
    token: "",
    feed_id: ""
  }

  constructor(private feedService: FeedService, private alert: AlertService ) { }

  ngOnInit() {
    this.feedService.feedData$.subscribe((res: any) => {
      this.feedData = res;
    })
  }

  feedDeleteAction(feedID: any, feedIndex: number) {
    this.postData.user_id = this.loginUser.user_id;
    this.postData.token = this.loginUser.token;
    this.postData.feed_id = feedID;
    //console.log(this.postData);
    this.alert.presentAlertConfirm("Delete feed", "Are you sure?").then( (res: any) => {
      //console.log(res.role);
      if(res.role === 'okay') {
        this.makeFeedDelete(this.postData, feedIndex);
      } else {

      }
    } );
  }

  makeFeedDelete( postData: any, feedIndex: number) {
    this.feedService.feedDelete(this.postData).subscribe( (res:any) => {
      if(res.success) {
        console.log("change in feedData$ ");
        this.feedService.deleteFeedData(feedIndex);
      }
    });
  }

}

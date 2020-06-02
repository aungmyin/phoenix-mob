import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-feed-update',
  templateUrl: './feed-update.component.html',
  styleUrls: ['./feed-update.component.scss'],
})
export class FeedUpdateComponent implements OnInit {
  
  @Input() loginUser: any;

  public postData = {
    user_id: "",
    token: "",
    feed: ""
  }

  constructor( private feedService: FeedService, private toastService: ToastService) { }

  ngOnInit() {
    console.log("hello");
  }

  validateInputs() {
    console.log(this.postData);
    let feed = this.postData.feed;
    return (
      this.postData.feed &&
      feed.length > 0
    );
  }

  feedUpdateAction() {
    this.postData.user_id = this.loginUser.user_id;
    this.postData.token = this.loginUser.token;

    if(this.validateInputs()) {
      this.feedService.feedUpdate(this.postData).subscribe( (res: any) => {
        this.postData.feed = '';
        //console.log(res.feedData);
        this.feedService.updateFeedData(res.feedData);
      })
    } else {
      this.toastService.presentToast("feed can't empty");
    }
    
  }

}

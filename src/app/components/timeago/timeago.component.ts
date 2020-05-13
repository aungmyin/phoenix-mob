import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeago',
  templateUrl: './timeago.component.html',
  styleUrls: ['./timeago.component.scss'],
})
export class TimeagoComponent implements OnInit {

  @Input() created: any;
  newDate: any;

  constructor() { }

  ngOnInit() {
    this.newDate = this.conVertTime(this.created);
  }

  conVertTime(time: any) {
    return new Date(time * 1000);
  }

}

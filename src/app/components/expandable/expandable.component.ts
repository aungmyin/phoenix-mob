import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {
  @Input() expanded: any;
  @Input() expandHeight: any;
  constructor() { }

  ngOnInit() {
    //console.log(this.expanded);
   // console.log(this.expandHeight);
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';
import { LogoComponent } from './logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FeedUpdateComponent } from './feed-update/feed-update.component';
import { TimeagoComponent } from './timeago/timeago.component';
import { ExpandableComponent } from './expandable/expandable.component';

@NgModule({
  declarations: [SlidesComponent, StartComponent, LogoComponent, FeedCardComponent, FeedUpdateComponent, TimeagoComponent, TimeAgoPipe, ExpandableComponent ],
  exports: [SlidesComponent, StartComponent, LogoComponent, FeedCardComponent, FeedUpdateComponent, TimeagoComponent, TimeAgoPipe, ExpandableComponent],
  imports: [
    CommonModule,
    IonicModule, // <- do not forget to add this import
    FormsModule
  ]
})
export class ComponentsModule { }

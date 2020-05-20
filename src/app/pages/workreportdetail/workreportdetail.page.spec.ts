import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkreportdetailPage } from './workreportdetail.page';

describe('WorkreportdetailPage', () => {
  let component: WorkreportdetailPage;
  let fixture: ComponentFixture<WorkreportdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkreportdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkreportdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

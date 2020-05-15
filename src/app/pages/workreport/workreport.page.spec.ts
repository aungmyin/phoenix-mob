import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkreportPage } from './workreport.page';

describe('WorkreportPage', () => {
  let component: WorkreportPage;
  let fixture: ComponentFixture<WorkreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

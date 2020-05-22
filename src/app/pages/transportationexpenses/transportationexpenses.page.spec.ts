import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransportationexpensesPage } from './transportationexpenses.page';

describe('TransportationexpensesPage', () => {
  let component: TransportationexpensesPage;
  let fixture: ComponentFixture<TransportationexpensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationexpensesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransportationexpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

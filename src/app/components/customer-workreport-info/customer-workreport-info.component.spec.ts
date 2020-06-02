import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerWorkreportInfoComponent } from './customer-workreport-info.component';

describe('CustomerWorkreportInfoComponent', () => {
  let component: CustomerWorkreportInfoComponent;
  let fixture: ComponentFixture<CustomerWorkreportInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerWorkreportInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerWorkreportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

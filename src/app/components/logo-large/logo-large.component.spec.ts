import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogoLargeComponent } from './logo-large.component';

describe('LogoLargeComponent', () => {
  let component: LogoLargeComponent;
  let fixture: ComponentFixture<LogoLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoLargeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

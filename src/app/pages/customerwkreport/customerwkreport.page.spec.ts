import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerwkreportPage } from './customerwkreport.page';

describe('CustomerwkreportPage', () => {
  let component: CustomerwkreportPage;
  let fixture: ComponentFixture<CustomerwkreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerwkreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerwkreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

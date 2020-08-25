import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPaketPage } from './detail-paket.page';

describe('DetailPaketPage', () => {
  let component: DetailPaketPage;
  let fixture: ComponentFixture<DetailPaketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPaketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPaketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

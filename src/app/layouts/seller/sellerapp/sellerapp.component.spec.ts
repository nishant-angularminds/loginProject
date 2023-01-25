import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerappComponent } from './sellerapp.component';

describe('SellerappComponent', () => {
  let component: SellerappComponent;
  let fixture: ComponentFixture<SellerappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

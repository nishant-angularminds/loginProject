import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopauthComponent } from './shopauth.component';

describe('ShopauthComponent', () => {
  let component: ShopauthComponent;
  let fixture: ComponentFixture<ShopauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopauthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

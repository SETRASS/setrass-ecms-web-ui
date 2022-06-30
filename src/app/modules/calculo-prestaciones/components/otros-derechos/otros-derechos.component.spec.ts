import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosDerechosComponent } from './otros-derechos.component';

describe('OtrosDerechosComponent', () => {
  let component: OtrosDerechosComponent;
  let fixture: ComponentFixture<OtrosDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrosDerechosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

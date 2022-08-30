import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoSalarialComponent } from './calculo-salarial.component';

describe('CalculoSalarialComponent', () => {
  let component: CalculoSalarialComponent;
  let fixture: ComponentFixture<CalculoSalarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculoSalarialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoSalarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

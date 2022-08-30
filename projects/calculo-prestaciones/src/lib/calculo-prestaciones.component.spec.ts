import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoPrestacionesComponent } from './calculo-prestaciones.component';

describe('CalculoPrestacionesComponent', () => {
  let component: CalculoPrestacionesComponent;
  let fixture: ComponentFixture<CalculoPrestacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculoPrestacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoPrestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

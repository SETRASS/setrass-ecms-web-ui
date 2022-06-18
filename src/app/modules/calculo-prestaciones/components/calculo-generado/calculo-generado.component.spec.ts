import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoGeneradoComponent } from './calculo-generado.component';

describe('CalculoGeneradoComponent', () => {
  let component: CalculoGeneradoComponent;
  let fixture: ComponentFixture<CalculoGeneradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculoGeneradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoGeneradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

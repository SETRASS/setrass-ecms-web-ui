import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerechosIdemnizacionesComponent } from './derechos-idemnizaciones.component';

describe('DerechosIdemnizacionesComponent', () => {
  let component: DerechosIdemnizacionesComponent;
  let fixture: ComponentFixture<DerechosIdemnizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DerechosIdemnizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DerechosIdemnizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

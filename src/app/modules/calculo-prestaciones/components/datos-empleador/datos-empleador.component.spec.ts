import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEmpleadorComponent } from './datos-empleador.component';

describe('DatosEmpleadorComponent', () => {
  let component: DatosEmpleadorComponent;
  let fixture: ComponentFixture<DatosEmpleadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEmpleadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

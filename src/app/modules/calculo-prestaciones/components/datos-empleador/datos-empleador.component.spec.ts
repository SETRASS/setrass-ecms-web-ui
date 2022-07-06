import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEmpleadorComponent } from './datos-empleador.component';

describe('DatosEmpleadorComponent', () => {
  let component: DatosEmpleadorComponent;
  let fixture: ComponentFixture<DatosEmpleadorComponent>;
  let compiled: HTMLElement;

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
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('is match with snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });
});

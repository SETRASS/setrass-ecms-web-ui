import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTrabajadorComponent } from './datos-trabajador.component';

describe('DatosTrabajadorComponent', () => {
  let component: DatosTrabajadorComponent;
  let fixture: ComponentFixture<DatosTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosTrabajadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

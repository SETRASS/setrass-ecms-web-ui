import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTrabajadorComponent } from './datos-trabajador.component';


describe('DatosTrabajadorComponent', () => {
  let component: DatosTrabajadorComponent;
  let fixture: ComponentFixture<DatosTrabajadorComponent>;
  let compiled: HTMLElement;
  let MatDatepickerModule;

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
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

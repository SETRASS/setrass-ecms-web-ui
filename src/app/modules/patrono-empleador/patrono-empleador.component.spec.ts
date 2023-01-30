import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronoEmpleadorComponent } from './patrono-empleador.component';

describe('PatronoEmpleadorComponent', () => {
  let component: PatronoEmpleadorComponent;
  let fixture: ComponentFixture<PatronoEmpleadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatronoEmpleadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronoEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

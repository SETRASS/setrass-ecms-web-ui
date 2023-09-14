import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectAccessComponent } from './direct-access.component';

describe('DirectAccessComponent', () => {
  let component: DirectAccessComponent;
  let fixture: ComponentFixture<DirectAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

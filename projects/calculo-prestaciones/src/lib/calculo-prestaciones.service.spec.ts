import { TestBed } from '@angular/core/testing';

import { CalculoPrestacionesService } from './calculo-prestaciones.service';

describe('CalculoPrestacionesService', () => {
  let service: CalculoPrestacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculoPrestacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

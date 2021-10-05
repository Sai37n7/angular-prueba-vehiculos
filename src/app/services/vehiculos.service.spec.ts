/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehiculosService } from './vehiculos.service';

describe('Service: Vehiculos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiculosService]
    });
  });

  it('should ...', inject([VehiculosService], (service: VehiculosService) => {
    expect(service).toBeTruthy();
  }));
});

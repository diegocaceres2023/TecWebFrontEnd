import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { estudiantesGuard } from './estudiantes.guard';

describe('estudiantesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => estudiantesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

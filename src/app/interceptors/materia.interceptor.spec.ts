import { TestBed } from '@angular/core/testing';

import { MateriaInterceptor } from './materia.interceptor';

describe('MateriaInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MateriaInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MateriaInterceptor = TestBed.inject(MateriaInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

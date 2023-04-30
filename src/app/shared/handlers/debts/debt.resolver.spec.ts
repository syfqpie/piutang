import { TestBed } from '@angular/core/testing';

import { DebtResolver } from './debt.resolver';

describe('DebtResolver', () => {
  let resolver: DebtResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DebtResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed, async, inject } from '@angular/core/testing';

import { ApiAuthGuard } from './api-auth.guard';

describe('ApiAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiAuthGuard]
    });
  });

  it('should ...', inject([ApiAuthGuard], (guard: ApiAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

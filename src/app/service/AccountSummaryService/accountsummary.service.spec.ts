import { TestBed } from '@angular/core/testing';

import { AccountsummaryService } from './accountsummary.service';

describe('AccountsummaryService', () => {
  let service: AccountsummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BoardcolumnService } from './boardcolumn.service';

describe('BoardcolumnService', () => {
  let service: BoardcolumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardcolumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DataRoomService } from './data-room.service';

describe('DataRoomService', () => {
  let service: DataRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

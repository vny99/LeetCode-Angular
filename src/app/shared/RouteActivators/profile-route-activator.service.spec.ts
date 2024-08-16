import { TestBed } from '@angular/core/testing';

import { ProfileRouteActivatorService } from './profile-route-activator.service';

describe('ProfileRouteActivatorService', () => {
  let service: ProfileRouteActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileRouteActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

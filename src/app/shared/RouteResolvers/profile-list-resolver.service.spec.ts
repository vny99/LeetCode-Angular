import { TestBed } from '@angular/core/testing';

import { ProfileListResolverService } from './profile-list-resolver.service';

describe('ProfileListResolverService', () => {
  let service: ProfileListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

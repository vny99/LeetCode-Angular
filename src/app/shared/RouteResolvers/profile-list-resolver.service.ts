import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { IProfile } from '../../models/profile';
import { ProfileService } from '../profile.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileListResolverService implements Resolve<IProfile[]>{

  constructor(private profileService: ProfileService) { }
  resolve(): MaybeAsync<IProfile[]> {
    return this.profileService.geAllProfiles().pipe(map(profiles => profiles));
  }
}

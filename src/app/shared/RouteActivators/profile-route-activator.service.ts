import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from '../profile.service';
import { map, Observable } from 'rxjs';
import { IProfile } from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileRouteActivatorService implements CanActivate{

  constructor(private profileService: ProfileService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    return this.profileService.getProfileById(+route.params['id']).pipe(
      map(profile => {
        if(profile){
          return true;
        } else{
          this.router.navigate(['404']);
          return false;
        }
      })
    );
  }
}

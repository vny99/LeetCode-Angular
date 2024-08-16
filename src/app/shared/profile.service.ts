import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IProfile } from '../models/profile';
import { PROFILES } from '../mocks/mock.profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  geAllProfiles(): Observable<IProfile[]>{
    return of(PROFILES)
  }

  getProfileById(id: number): Observable<IProfile | undefined> {
    const profile = PROFILES.find(p => p.id === id);
     return of(profile);
  }

  deleteProfileById(id: number): Observable<void>{
    const index = PROFILES.findIndex(p => p.id === id);
    if(index > -1){
      PROFILES.splice(index, 1);
    }
    return of(undefined);
  }

  updateProfile(profile: IProfile): void{
    const index = PROFILES.findIndex(p => p.id === profile.id);
    if(index > -1){
      PROFILES[index] = profile;
    } else{
      PROFILES.push(profile);
    }
  }

}

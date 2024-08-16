import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileRouteActivatorService } from './shared/RouteActivators/profile-route-activator.service';
import { ProfileListResolverService } from './shared/RouteResolvers/profile-list-resolver.service';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'profile-details/:id', component:ProfileComponent},
  {path:'profile-list', component:ProfileListComponent, resolve: {profiles: ProfileListResolverService}},
  {path:'add-profile/:id', component:AddProfileComponent, canActivate: [ProfileRouteActivatorService]},
  {path:'add-profile', component:AddProfileComponent},
  {path:'404',component:NotFoundComponent},
  {path:'', redirectTo:'profile-list', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

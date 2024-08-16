import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { IProfile } from '../models/profile';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss'
})
export class ProfileListComponent implements OnInit{

  profiles: IProfile[] = [];
  columnsToDisplay : string[] = ['name', 'gender', 'dob', 'action'];
  profileDataSource?: MatTableDataSource<IProfile>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private profileService: ProfileService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.profiles = this.route.snapshot.data['profiles'];
    this.profileDataSource = new MatTableDataSource(this.profiles);
  }

  ngAfterViewInit(): void{
    this.profileDataSource!.paginator = this.paginator;
    this.profileDataSource!.sort = this.sort;
  }

  deleteProfile(id: number): void{
    this.profileService.deleteProfileById(id).subscribe(() => {
      this.profiles = this.profiles.filter(profile => profile.id !== id);
      this.profileDataSource!.data = this.profiles;
    });
  }

  handleEdit(id: number): void{
      this.router.navigate(['add-profile', id]);
  }

}

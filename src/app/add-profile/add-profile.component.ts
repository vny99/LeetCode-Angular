import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfile } from '../models/profile';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrl: './add-profile.component.scss'
})
export class AddProfileComponent implements OnInit {

  profile: IProfile = {
    id: 0,
    name: '',
    dob: '',
    gender:''
  };
  id: number | undefined;
  name?: FormControl;
  gender?: FormControl;
  dob?: FormControl;
  profileFormGroup?: FormGroup;
  isFormValid: boolean = true;
  constructor(private router: Router, private route:ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if(this.id !== undefined){
       this.profileService.getProfileById(this.id).subscribe({
        next: profile => profile ? this.profile = profile : null,
       });
    }
    this.name = new FormControl(this.profile.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]);
    this.gender = new FormControl(this.profile.gender, Validators.required);
    this.dob = new FormControl(this.profile.dob, [Validators.required, this.dobValidator()]);
    this.profileFormGroup = new FormGroup({
      name: this.name,
      gender: this.gender,
      dob: this.dob
    })
  }

  cancel(): void{
    this.router.navigate(['/profile-list']);
  }

  isNameValid(): boolean{
    return this.name!.valid || this.name!.untouched;
  }

  isNameInvalidToSubmit():boolean{
    return this.name!.invalid && !this.isFormValid;
  }

  isGenderValid(): boolean{
    return this.gender!.valid || this.gender!.untouched;
  }

  isGenderInvalidToSubmit(): boolean{
    return this.gender!.invalid && !this.isFormValid;
  }

  isDobValid(): boolean{
    return this.dob!.valid || this.dob!.untouched;
  }

  isDobInvalidToSubmit(): boolean{
    return this.dob!.invalid && !this.isFormValid;
  }

  dobValidator(): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null =>{
      const dob = new Date(control.value);
      const currentDate = new Date();
      if(dob > currentDate) return {'dobInvalid': {value : control.value}};
      return null;
    }
  }
  
  submit(formValues: any): void{
    if(this.profileFormGroup?.invalid) this.isFormValid = false;
    else{
      this.profileService.updateProfile({
        id: this.id !== undefined && this.id !== null && !isNaN(this.id) ? this.id : Math.floor(Math.random() * 1000),
        name: formValues.name,
        dob: formValues.dob,
        gender: formValues.gender
      });
      this.router.navigate(['/profile-list']);
    }
  }

}

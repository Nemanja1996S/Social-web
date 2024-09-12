import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SportSocialService } from '../services/sport-social.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(private service: SportSocialService, private router: Router) {}

  visiblePassword : boolean = false;
  sportsOptions = ["Soccer", "Basketball", "Tennis"] ;
  sportsSelected: string[] = [];

  registryFormGroup = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    surnameFormControl: new FormControl('', Validators.required),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', Validators.required),
    selectedSportFormControl: new FormControl('', Validators.required),
    dateFormControl: new FormControl(''),
    educationFormControl: new FormControl(''),
    workFormControl: new FormControl(''),
    aboutMeFormControl: new FormControl(''),
  });

  submitForm(){  
    const user: User = {
        id: 1,
        name: this.registryFormGroup.get('nameFormControl')?.value ?? '',
        surname: this.registryFormGroup.get('surnameFormControl')?.value ?? '',
        email: this.registryFormGroup.get('emailFormControl')?.value ?? '',
        password: this.registryFormGroup.get('passwordFormControl')?.value ?? '',
        picture: '',
        friendsIds: [],
        selectedSports: this.sportsSelected,
        dateOfBirth: this.registryFormGroup.get('dateFormControl')?.value ?? '',
        education: this.registryFormGroup.get('educationFormControl')?.value ?? '',
        work: this.registryFormGroup.get('workFormControl')?.value ?? '',
        aboutMe: this.registryFormGroup.get('aboutMeFormControl')?.value ?? '',

    }
    console.log(user);
    //post to database
    alert("Registration successfull");
    this.router.navigate(['']);

    
  }

  togglePasswordText(){
    this.visiblePassword = !this.visiblePassword;
  }

  addSelectedOption(){
    const chosenSport = this.registryFormGroup.get('selectedSportFormControl')?.value ?? '';
    if(chosenSport){
      if(!this.sportsSelected.find( (sport) => sport === chosenSport)){
        this.sportsSelected.push(chosenSport)
      }
      
    }
    console.log(this.sportsSelected);
  }

  removeSport(sport: string){
    this.sportsSelected = this.sportsSelected.filter( sportSel => sportSel !== sport);
    if(this.sportsSelected.length < 1){
      this.registryFormGroup.controls.selectedSportFormControl.setValue('');
    }
    else this.registryFormGroup.controls.selectedSportFormControl.setValue(this.sportsSelected[0]);
    console.log(this.sportsSelected);
  }
}

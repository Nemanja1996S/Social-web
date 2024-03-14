import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SportSocialService } from '../services/sport-social.service';

@Component({
  selector: 'registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(private service: SportSocialService) {}

  visiblePassword : boolean = false;
  sportsOptions = ["Soccer", "Basketball", "Tennis"] ;
  sportsSelected: string[] = [];

  registryFormGroup = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    surnameFormControl: new FormControl('', Validators.required),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', Validators.required),
    //sportsArrayFormControl: new FormControl([], Validators.required),
    selectedSportFormControl: new FormControl('', Validators.required),
    dateFormControl: new FormControl(''),
    educationFormControl: new FormControl(''),
    workFormControl: new FormControl(''),
    aboutMeFormControl: new FormControl(''),
  });

  submitForm(){
    console.log(this.registryFormGroup.value);
    if(this.registryFormGroup.value){
      this.service.addUser({
        id: 1,
        name: this.registryFormGroup.get('nameFormContol')?.value ?? 'sfasfa',
        surname: this.registryFormGroup.get('surnameFormContol')?.value ?? 'sfasfa',
        email: this.registryFormGroup.get('emailFormContol')?.value ?? 'sfasfa',
        password: this.registryFormGroup.get('passwordFormContol')?.value ?? 'sfasfa',
        selectedSports: this.sportsSelected,
        dateOfBirth: this.registryFormGroup.get('dateFormContol')?.value ?? 'sfasfa',
        education: this.registryFormGroup.get('educationFormContol')?.value ?? 'sfasfa',
        work: this.registryFormGroup.get('workFormContol')?.value ?? 'sfasfa',
        aboutMe: this.registryFormGroup.get('aboutMeFormContol')?.value ?? 'sfasfa'
      });
    }
    
  }

  togglePasswordText(){
    this.visiblePassword = !this.visiblePassword;
    
  }

  addSelectedOption(){
    //this.sportsSelected.push(option);
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
    console.log(this.sportsSelected);
    //this.registryFormGroup.setValue({...this.registryFormGroup, selectedSportFormControl: ''})
  }
}

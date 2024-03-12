import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

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
}

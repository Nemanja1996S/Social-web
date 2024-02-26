import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  visiblePassword : boolean = false;

  registryFormGroup = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    surnameFormControl: new FormControl('', Validators.required),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', Validators.required),
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
}

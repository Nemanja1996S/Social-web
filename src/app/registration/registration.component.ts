import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SportSocialService } from '../services/sport-social.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter()
],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit{

  constructor(private service: SportSocialService, private router: Router,
     private snackBar: MatSnackBar) {}

     
  selectedImageFile = null;
  userImg = ''
  visiblePassword : boolean = false;
  // sportsOptions = ["Soccer", "Basketball", "Tennis"] ;
  sportsOptions$: Observable<string[]> = of([]);
  sportsSelected: string[] = [];

  registryFormGroup = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    surnameFormControl: new FormControl('', Validators.required),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', Validators.required),
    selectedSportFormControl: new FormControl([], Validators.required),
    dateFormControl: new FormControl('', Validators.required),
    educationFormControl: new FormControl(''),
    workFormControl: new FormControl(''),
    aboutMeFormControl: new FormControl(''),
  });

  ngOnInit(): void {
    this.sportsOptions$ = this.service.getAllSports();
  }

  submitForm(): void{  
    if(!this.userImg){
      this.snackBar.open("You need to choose profile picture", 'OK')
      return;
    }
      
    if(this.registryFormGroup.invalid){
      this.snackBar.open("Your data is invalid or missing", 'OK')
      return;
    }
      
    const user: User = {
        id: -1,
        name: this.registryFormGroup.get('nameFormControl')?.value ?? '',
        surname: this.registryFormGroup.get('surnameFormControl')?.value ?? '',
        email: this.registryFormGroup.get('emailFormControl')?.value ?? '',
        password: this.registryFormGroup.get('passwordFormControl')?.value ?? '',
        picture: this.userImg,
        friendsIds: [],
        selectedSports: this.registryFormGroup.controls.selectedSportFormControl.value ?? [],
        dateOfBirth: this.getDateFromFormControlStringDDMMYYYY(this.registryFormGroup.controls.dateFormControl.value ?? '') ,
        education: this.registryFormGroup.get('educationFormControl')?.value ?? '',
        work: this.registryFormGroup.get('workFormControl')?.value ?? '',
        aboutMe: this.registryFormGroup.get('aboutMeFormControl')?.value ?? '',

    }
    // let ddmmyy = user.dateOfBirth.split('-').reverse() this.getDateFromFormControlStringDDMMYYYY(
    // let birth = ''
    // ddmmyy.forEach(part => birth += part)
    // user.dateOfBirth = birth;
    // const date = formatDate(user.dateOfBirth, 'DDMMYYYY', '' )
    console.log(user)
    console.log(user.dateOfBirth)
    // console.log(this.getDateFromFormControlStringDDMMYYYY(user.dateOfBirth))
    this.service.postUser(user).subscribe(result =>{
      if(result){
        this.snackBar.open("Registration successfull", 'OK')   //("Registration successfull");
        this.router.navigate(['']);
      }
    })
  }

  getDateFromFormControlStringDDMMYYYY(date: string): string{
    const yyyymmdd = date.split('-')
    const year = yyyymmdd[0]
    const month = yyyymmdd[1]
    const day = yyyymmdd[2]
    return `${day}.${month}.${year}`;
}

  onFileSelected( event: any) : void{
    this.selectedImageFile = event.target.files[0];
    this.userImg = URL.createObjectURL(event.target.files[0]);
  }

  togglePasswordText(){
    this.visiblePassword = !this.visiblePassword;
  }

  closeImg(){
    this.userImg = ''
  }

  // addSelectedOption(){
  //   const chosenSport = this.registryFormGroup.get('selectedSportFormControl')?.value ?? '';
  //   if(chosenSport){
  //     if(!this.sportsSelected.find( (sport) => sport === chosenSport)){
  //       this.sportsSelected.push(chosenSport)
  //     }
      
  //   }
  //   console.log(this.sportsSelected);
  // }

  // removeSport(sport: string){
  //   this.sportsSelected = this.sportsSelected.filter( sportSel => sportSel !== sport);
  //   if(this.sportsSelected.length < 1){
  //     this.registryFormGroup.controls.selectedSportFormControl.setValue('');
  //   }
  //   else this.registryFormGroup.controls.selectedSportFormControl.setValue(this.sportsSelected[0]);
  //   console.log(this.sportsSelected);
  // }
}

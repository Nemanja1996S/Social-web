import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { UpdateUserDto, User } from '../../models/User';
import { initialUser } from '../store/user/user.reducer';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SportSocialService } from '../services/sport-social.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

export interface EditProfileDialogInputData{
  // isConfirmed: boolean,
  title: string,
  user: User,
  sportsList: string[],
  confirmString: string,
  cancelString: string
}

export interface EditProfileDialogOutputData{
  user: UpdateUserDto,
  selectedImage: File | null
}

@Component({
  selector: 'profile-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, CommonModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter()], //provideNativeDateAdapter()
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileDialogComponent {
  inputData: EditProfileDialogInputData = {
    title: '',
    user: initialUser,
    sportsList: [],
    confirmString: '',
    cancelString: ''
  }
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  selectedImageFile = null;
  userInputImg : string = '';
  sportsLista: string[] = []

  editProfileFormGroup = new FormGroup({			
    nameFormControl : new FormControl(),
    surnameFormControl : new FormControl(),
    emailFormControl : new FormControl(),
    passwordFormControl : new FormControl(),
    pictureFormControl : new FormControl(),
    selectedSportsFormControl: new FormControl(),
    dateOfBirthFormControl : new FormControl(),
    educationFormControl : new FormControl(),
    workFormControl : new FormControl(),
    aboutMeFormControl : new FormControl()
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditProfileDialogInputData, private service:SportSocialService) { } //data: {isYesClicked: boolean, }

  ngOnInit(): void {
    this.inputData = this.data
    this.sportsLista = this.inputData.sportsList//.subscribe(sports => {this.sportsList = Array.from(sports)})
    if(this.inputData.user){
      this.editProfileFormGroup.setValue({nameFormControl : (this.inputData.user.name),
        surnameFormControl : (this.inputData.user.surname),
        emailFormControl : (this.inputData.user.email),
        passwordFormControl : (this.inputData.user.password),
        pictureFormControl : (''),
        selectedSportsFormControl: (this.inputData.user.selectedSports),
        dateOfBirthFormControl : (''),
        educationFormControl : (this.inputData.user.education),
        workFormControl : (this.inputData.user.work),
        aboutMeFormControl : (this.inputData.user.aboutMe)})
    }
    
  }

  // getFormGroup(): FormGroup{
  //   return this.editProfileFormGroup
  // }
  onYes(){
    const controls = this.editProfileFormGroup.controls;
    // console.log(this.editProfileFormGroup.value)
    // console.log(fg)
  //   let user: User = this.inputData.user;
  // //   function read_prop(obj : any, prop: any, value: any) {
  // //     obj.prop = value;
  // //     console.log(obj)
  // //     console.log(obj.prop);
  // // }
  //   // function getValue(key: keyof User) {
  //   //   return user[key]
  //   // }
  //   // function setValue(key: keyof User, value: any) {
  //   //   return user[key]
  //   // }
    
  //   Object.entries(controls).forEach(([formControlName, formControl]) => {
  //     if(formControl.dirty){
  //       // console.log(`dirty: formControlName: ${formControlName} value ${formControl.value}`)
  //       const userProperty = formControlName.split('FormControl')
  //       // read_prop(user, userProperty, formControl.value)
  //       // user[userProperty[0].toString()] = formControl.value
  //       //this.editProfileFormGroup.controls.pictureFormControl.setValue(this.selectedImageFile)
  //       Object.keys(user).filter(property => property !== 'picture').map(property => property === userProperty[0] ? Object.assign(user, user, {[property]: formControl.value}) : null)
  //       // console.log(user)
  //     }
      
  //   });
    const userOutput: UpdateUserDto = {
      id: this.inputData.user.id,
      name: controls.nameFormControl.value ?? this.inputData.user.name,
      surname: controls.surnameFormControl.value ?? this.inputData.user.surname,
      email: controls.emailFormControl.value ?? this.inputData.user.email,
      password: controls.passwordFormControl.value ?? this.inputData.user.password,
      picture: this.inputData.user.picture,
      selectedSports: controls.selectedSportsFormControl.value ?? this.inputData.user.selectedSports,
      dateOfBirth: this.getDateFromFormControlStringDDMMYYYY(controls.dateOfBirthFormControl.value) ?? this.inputData.user.dateOfBirth,
      education: controls.educationFormControl.value ?? this.inputData.user.education,
      work: controls.workFormControl.value ?? this.inputData.user.work,
      aboutMe: controls.aboutMeFormControl.value ?? this.inputData.user.aboutMe
    }
    const output : EditProfileDialogOutputData = {user: userOutput, selectedImage: this.selectedImageFile ?? null}
    this.dialogRef.close(output);
  }

  onNo(){
    this.dialogRef.close(false);
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
    ///const newValue : string = URL.createObjectURL(event.target.files[0]).toString();
    // this.editProfileFormGroup.controls.pictureFormControl.setValue(newValue);
    this.userInputImg = URL.createObjectURL(event.target.files[0]);
  }
}



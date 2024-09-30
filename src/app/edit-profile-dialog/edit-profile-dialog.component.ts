import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/User';
import { initialUser } from '../store/user/user.reducer';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

export interface EditProfileDialogInputData{
  isConfirmed: boolean,
  title: string,
  user: User,
  confirmString: string,
  cancelString: string
}

@Component({
  selector: 'profile-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent {
  inputData: EditProfileDialogInputData = {
    isConfirmed: false,
    title: '',
    user: initialUser,
    confirmString: '',
    cancelString: ''
  }
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  selectedImageFile = null;
  userPostImg : string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: EditProfileDialogInputData) { } //data: {isYesClicked: boolean, }

  ngOnInit(): void {
    this.inputData = this.data
  }

  onYes(){
    this.dialogRef.close(true);
  }

  onNo(){
    this.dialogRef.close(false);
  }

  onFileSelected( event: any) : void{
    this.selectedImageFile = event.target.files[0];
    this.userPostImg = URL.createObjectURL(event.target.files[0]);
  }
}



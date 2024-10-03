import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { initialPost, Post } from '../../models/Post';
import { initialUser } from '../store/user/user.reducer';
import { User } from '../../models/User';

export interface EditPostDialogInputData{
  // isConfirmed: boolean,
  title: string,
  post: Post,
  user: User,
  confirmString: string,
  cancelString: string
}

export interface EditPostDialogOutputData{
  postText: string | null,
  selectedImage: File | null
}

@Component({
  selector: 'app-edit-post-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './edit-post-dialog.component.html',
  styleUrl: './edit-post-dialog.component.scss'
})
export class EditPostDialogComponent {

  inputData: EditPostDialogInputData = {
    title: '',
    post: initialPost,
    user: initialUser,
    confirmString: '',
    cancelString: ''
  }
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  selectedImageFile = null;
  userInputCommentImg : string = '';

  postTextFormControl = new FormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditPostDialogInputData) { } 

  ngOnInit(): void {
    console.log(this.data)
    this.inputData = this.data
    if(this.inputData.post.text){
      this.postTextFormControl.setValue(this.inputData.post.text)
    }
  }

  onYes(){
    const output : EditPostDialogOutputData = {postText: this.postTextFormControl.value, selectedImage: this.selectedImageFile ?? null}
    this.dialogRef.close(output);
  }

  onNo(){
    this.dialogRef.close(false);
  }

  onFileSelected( event: any) : void{
    this.selectedImageFile = event.target.files[0];
    this.userInputCommentImg = URL.createObjectURL(event.target.files[0]);
  }

  getSportsArrayforPost(post: Post): string[]{
    return post.forSports.map(sport => {return ` ${sport}`})
  }
}



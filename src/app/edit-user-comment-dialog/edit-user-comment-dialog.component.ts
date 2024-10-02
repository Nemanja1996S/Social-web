import { Component, Inject, inject } from '@angular/core';
import { UserComment } from '../../models/Comment';
import { initialUserComment } from '../store/comments/comments.reducer';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
export interface EditUserCommentDialogInputData{
  // isConfirmed: boolean,
  title: string,
  userComment: UserComment,
  confirmString: string,
  cancelString: string
}

export interface EditUserCommentDialogOutputData{
  userComment: UserComment,
  selectedImage: File | null
}
@Component({
  selector: 'app-edit-user-comment-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './edit-user-comment-dialog.component.html',
  styleUrl: './edit-user-comment-dialog.component.scss'
})
export class EditUserCommentDialogComponent {
  inputData: EditUserCommentDialogInputData = {
    title: '',
    userComment: initialUserComment,
    confirmString: '',
    cancelString: ''
  }
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  selectedImageFile = null;
  userInputCommentImg : string = '';
  //sportsList: Observable<string[]> = of([]);

  editCommentFormGroup = new FormGroup({			
    commentTextFormControl : new FormControl(''),
    commentPicFormControl : new FormControl('')
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditUserCommentDialogInputData) { } 

  ngOnInit(): void {
    console.log(this.data)
    this.inputData = this.data
    if(this.inputData.userComment){
      this.editCommentFormGroup.setValue({commentTextFormControl : (this.inputData.userComment.commentText),
        commentPicFormControl : (this.inputData.userComment.commentPic)})
    }
  }

  onYes(){
    const controls = this.editCommentFormGroup.controls;
    let userComment: UserComment = this.inputData.userComment;
    
    Object.entries(controls).forEach(([formControlName, formControl]) => {
      if(formControl.dirty){
        const userCommentProperty = formControlName.split('FormControl')
        Object.keys(userComment).filter(property => property !== 'commentPic')
        .map(property => property === userCommentProperty[0] ? Object.assign(userComment, userComment,
           {[property]: formControl.value}) : null)
        // console.log(user)
      }
      
    });
    const output : EditUserCommentDialogOutputData = {userComment: userComment, selectedImage: this.selectedImageFile ?? null}
    this.dialogRef.close(output);
  }

  onNo(){
    this.dialogRef.close(false);
  }

  onFileSelected( event: any) : void{
    this.selectedImageFile = event.target.files[0];
    this.userInputCommentImg = URL.createObjectURL(event.target.files[0]);
  }
}



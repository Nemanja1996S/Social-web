import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserComment } from '../../models/Comment';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { deleteUserComment, editUserComment, loadComments, makeComment } from '../store/comments/comments.actions';
import { Observable, of } from 'rxjs';
import { errorCommentsSelector, userCommentsSelector } from '../store/comments/comments.selector';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/User';
import { userIdSelector, userSelector } from '../store/user/user.selector';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Location } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EditUserCommentDialogComponent, EditUserCommentDialogOutputData } from '../edit-user-comment-dialog/edit-user-comment-dialog.component';
import { initialUser } from '../store/user/user.reducer';
import { changeNumberOfCommentsOfPost } from '../store/posts/posts.actions';


@Component({
  selector: 'comment',
  standalone: true,
  imports: [MatCardModule,NgFor, NgIf, ReactiveFormsModule, ImageModule, CommonModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIcon, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
  // MatButtonModule, MatIconModule,
  // CommonModule, ReactiveFormsModule, MatFormFieldModule,
  // MatInputModule, MatCheckboxModule
})
export class CommentComponent implements OnInit{
  usersComment$ : Observable<UserComment[]> = of([])
  commentTextFormControl = new FormControl('', Validators.required);
  selectedImageFile = null;
  userCommentImg : string = '';
  currentUser$: Observable<User> = of();
  currentPostId: number = -1;
  currentUserId$: Observable<number> = of();
  currentUser: User = initialUser;
  currentUserId: number = -1;
  error$: Observable<string | null> = of();
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private location: Location){
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('postId');
      if(id){
        this.currentPostId = parseInt(id)
      }
    })
    this.store.dispatch(loadComments({postId: this.currentPostId})) //u json api se ne trazi po postId, nego id, al sam su id i post jednaki
    this.error$ = this.store.select(errorCommentsSelector);
    this.usersComment$ = this.store.select(userCommentsSelector);
    this.currentUser$ = this.store.select(userSelector);
    this.currentUserId$ = this.store.select(userIdSelector);
    // this.usersComment$.subscribe((comments) => console.log(comments));
    this.currentUserId$.subscribe((userId) => {this.currentUserId = userId})
    this.currentUser$.subscribe(user => this.currentUser = user)
  }

  onFileSelected( event: any) : void{
    this.selectedImageFile = event.target.files[0];
    this.userCommentImg = URL.createObjectURL(event.target.files[0]);
  }

  onComment(){  
    let userComment: UserComment = {
      userId: this.currentUser.id, userName: this.currentUser.name, userSurname: this.currentUser.surname,
      userPicSrc: this.currentUser.picture, commentDate: '', commentPic: this.userCommentImg,
      commentText: this.commentTextFormControl.value ?? '', postId: this.currentPostId,
      id: -1
    }
    this.store.dispatch(makeComment({userComment: userComment, postId: this.currentPostId}));
    this.store.dispatch(changeNumberOfCommentsOfPost({postId: this.currentPostId, amount: 1}));
    this.userCommentImg = '';
    this.commentTextFormControl.reset();
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, userComm: UserComment): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {isConfirmed: false, title: "Delete comment", content: "Would you like to delete this comment?", confirmString: "Yes", cancelString: "No"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(deleteUserComment({userComment: userComm}))         //delete comment
        this.store.dispatch(changeNumberOfCommentsOfPost({postId: this.currentPostId, amount: -1}));
      }
    });
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, userComm: UserComment): void {
    const dialogRef = this.dialog.open(EditUserCommentDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {title: "Edit comment:", userComment: userComm, confirmString: "Save", cancelString: "Cancel"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result as EditUserCommentDialogOutputData){
        let editUC: UserComment = result.userComment
        if(result.selectedImage){
          const imgUrl = URL.createObjectURL(result.selectedImage)
          editUC = {...editUC, commentPic: imgUrl}
        }
        this.store.dispatch(editUserComment({userComment: editUC}));
      }
    });
  }

  goBack(){
    this.router.navigate(['/home'])
  }

}
  


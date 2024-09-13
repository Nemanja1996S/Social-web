import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PostComponent } from '../post/post.component';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { pictureSelector, selectedSportsSelector, selSportsSelector, userSelector } from '../store/users/users.selector';
import { postsSelector } from '../store/posts/posts.selector';


@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    NgFor,
    ReactiveFormsModule,
    PostComponent,
    CommonModule
   ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  //usersSports : string[] = ['football', 'basketball', 'table tennis', 'voleyball', 'swiming', 'bodybuilding'];
  //usersSport$: Observable<string[]> = of([]);
  usersSports : string[] = []
  linksIcons = [{link: 'Home', icon: 'home'}, {link: 'Friends', icon: 'group'}, {link:'Groups', icon: 'groups'}];
  activeLink = this.linksIcons[0].link;


  selectedSportFormControl = new FormControl([],Validators.required);

  
  constructor(private snackBar: MatSnackBar, private store: Store<AppState>){
    this.store.select(selectedSportsSelector).subscribe(userSports => console.log(userSports))
  }
  ngOnInit(): void {
    // this.store.select(selectedSportsSelector).subscribe((usersSportss) => console.log(usersSportss))
  }

  searchSports(){
    if(this.selectedSportFormControl.valid){
      console.log(this.selectedSportFormControl.value);
    }
    else {
      this.selectedSportFormControl.markAsTouched();
      let snackBarRef = this.snackBar.open('Selection of at least 1 sport is needed', 'OK');
    }
  }
  

}

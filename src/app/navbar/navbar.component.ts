import { NgFor } from '@angular/common';
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
    ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  usersSports : string[] = ['football', 'basketball', 'table tennis', 'voleyball', 'swiming', 'bodybuilding'];

  linksIcons = [{link: 'Home', icon: 'home'}, {link: 'Friends', icon: 'group'}, {link:'Groups', icon: 'groups'}];
  activeLink = this.linksIcons[0].link;


  selectedSportFormControl = new FormControl([],Validators.required);

  ngOnInit(): void {
  }

  constructor(private snackBar: MatSnackBar){
    
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

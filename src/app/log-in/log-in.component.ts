import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SportSocialService } from '../services/sport-social.service';
import { AppState } from '../store/app.state';
import { Store, select } from '@ngrx/store';
import * as Actions from '../store/users/users.actions'
import { IsLoadingSelector } from '../store/users/users.selector';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'log-in',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {

  visiblePassword : boolean = false;

  logInFormGroup = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', Validators.required),
  });

  isLoading$ : Observable<boolean> = of(false); 

  constructor(private router: Router, private service: SportSocialService, private store : Store<AppState> ){
    this.isLoading$ = this.store.pipe(select(IsLoadingSelector));
   }

  ngOnInit(): void {
    this.store.dispatch(Actions.start());
  }

  goToRegistry(){
    this.router.navigate(['registry'])
  }

  togglePasswordText(){
    this.visiblePassword = !this.visiblePassword;
  }

  submitForm(){
    this.store.dispatch(Actions.loadUser({
      email: this.logInFormGroup.get('emailFormControl')?.value ?? '',
      password: this.logInFormGroup.get('passwordFormControl')?.value ?? '',}))
  }

  // tryToLogIn(): boolean {
  //   this.service.getUser(this.logInFormGroup.get('emailFormControl')?.value ?? '')
  // }
  
}

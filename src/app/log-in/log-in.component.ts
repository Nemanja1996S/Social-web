import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SportSocialService } from '../services/sport-social.service';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { loadUser } from '../store/users/users.actions';

@Component({
  selector: 'log-in',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {

  constructor(private router: Router, private service: SportSocialService, private store : Store<AppState> ){ }

  visiblePassword : boolean = false;

  logInFormGroup = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
   
  }

  goToRegistry(){
    this.router.navigate(['registry'])
  }

  togglePasswordText(){
    this.visiblePassword = !this.visiblePassword;
  }

  submitForm(){
    this.store.dispatch(loadUser({
      email: this.logInFormGroup.get('emailFormControl')?.value ?? '',
      password: this.logInFormGroup.get('passwordFormControl')?.value ?? '',}))
  }

  // tryToLogIn(): boolean {
  //   this.service.getUser(this.logInFormGroup.get('emailFormControl')?.value ?? '')
  // }
  
}

import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'log-in',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {

  constructor(private router: Router){ }

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

  }
}

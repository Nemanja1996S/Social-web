import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'log-in',
  standalone: true,
  imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  constructor(private router: Router){

  }

  goToRegistry(){
    this.router.navigate(['registry'])
  }
}

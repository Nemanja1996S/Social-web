import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'log-in',
  standalone: true,
  imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {

  constructor(private router: Router){ }

  ngOnInit(): void {
   
  }

  goToRegistry(){
    this.router.navigate(['registry'])
  }
}

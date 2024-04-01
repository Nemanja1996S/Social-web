import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface SportColor{
  sport: string,
  color: string
}
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  usersSports : string[] = ['football', 'basketball', 'table tennis', 'voleyball', 'swiming', 'bodybuilding'];
  
  usersSportsColor: SportColor[] = [];
  selectedSports: string[] = [];

  selectedSportFormControl = new FormControl('');

  ngOnInit(): void {
    this.usersSportsColor = this.usersSports.map((sport) => ({sport: sport, color: 'bg-light'}))
  }
  constructor(){
    
  }

  pickSport(){
    const chosenSport = this.selectedSportFormControl.value;
    if(!chosenSport) return;
    if(!this.selectedSports.find((sport) => sport === chosenSport)){
      this.selectedSports.push(chosenSport);
      this.usersSportsColor = this.usersSportsColor.map((sportColor) => 
      sportColor.sport === chosenSport ?
       ({sport: sportColor.sport, color: 'bg-success bg-gradient'})
       :sportColor)

    }
    console.log(this.usersSportsColor);
  }

}

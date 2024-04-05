import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

interface SportColor{
  sport: string,
  color: string
}

const green = 'bg-success bg-gradient';
const white = 'bg-light';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  usersSports : string[] = ['football', 'basketball', 'table tennis', 'voleyball', 'swiming', 'bodybuilding'];
  
  usersSportsColor: SportColor[] = [];//Observable<SportColor[]> = of([]);
  selectedSports: string[] = [];

  lastPickedSport: string = ''

  selectedSportFormControl = new FormControl('Select sports to see');

  ngOnInit(): void {
    this.usersSportsColor = this.usersSports.map((sport) => ({sport: sport, color: white}))
  }
  constructor(){
    
  }

  pickSport(){
    console.log('Poziv event funkcije')
    const chosenSport = this.selectedSportFormControl.value;
    if(!chosenSport) return;
    if(!this.selectedSports.find((sport) => sport === chosenSport)){
      this.selectedSports.push(chosenSport);
      this.usersSportsColor = this.usersSportsColor.map((sportColor) => 
      sportColor.sport === chosenSport?
       ({sport: sportColor.sport, color: green})
       :sportColor);

    }
    else{
      this.selectedSports = this.selectedSports.filter((sport) => sport !== chosenSport);
      this.usersSportsColor = this.usersSportsColor.map((sportColor) => 
      sportColor.sport === chosenSport?
       ({sport: sportColor.sport, color: white})
       :sportColor);
    }
    //this.selectedSportFormControl.setValue('Select sport to see');
    //this.lastPickedSport = chosenSport;
    //console.log("sport cosen:" + chosenSport)
    // console.log(this.usersSportsColor);
    // console.log(this.selectedSports);
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { NavbarComponent } from '../navbar/navbar.component';
import { Friend } from '../../models/UserFriends';
import { Observable, of } from 'rxjs';
import { FriendAndNumberOfMuturalFriends, friendsAndNumberOfMuturalFriendsSelector, userFriendsArraySelector } from '../store/userFriends/userFriends.selectors';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SportSocialService } from '../services/sport-social.service';

interface PeopleOption{
  userId: number,
  userFullname: string,
  userPicture: string,
  numberOfMuturalFriends: number
}

@Component({
  selector: 'friends',
  standalone: true,
  imports: [NavbarComponent, CommonModule, NgFor, MatCardModule,  FormsModule, MatFormFieldModule, 
    MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit{

  activeLink: string = "Friends";
  // userFriend$: Observable<Friend[] | null> = of([]);
  userFriendsAndNumberOfMuturalFriend$ : Observable<FriendAndNumberOfMuturalFriends[] | null> = of([]);
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];

  peopleOptions: PeopleOption[] = [{userId: 0, userFullname: "Nemanja Savic", userPicture: "https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.18169-1/969987_488172031277757_895038162_n.jpg?stp=c50.50.620.620a_dst-jpg_s160x160&_nc_cat=107&ccb=1-7&_nc_sid=312bcd&_nc_ohc=AYQcGVtt09QQ7kNvgEPWl6J&_nc_ht=scontent.fbeg10-1.fna&oh=00_AYAiqX-zih0ndWA239uG0Vv8Zzhvp00_L8KtYt1Lk1HZ3A&oe=67097EE0"
    ,numberOfMuturalFriends: 3},
  { userId: 1,
    userFullname: "Marko Stoijljkovic",
    userPicture: "https://scontent.fbeg10-1.fna.fbcdn.net/v/t39.30808-1/376655995_6714521235279645_6116058130008955357_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=LsXS8GvKl4IQ7kNvgFIDoAY&_nc_ht=scontent.fbeg10-1.fna&_nc_gid=ARUXtCxLCCwMpGRbuROAgAv&oh=00_AYD_GuvYiFOA19xvYLOk37dpDZz4laiYAbziWgYmO6qo5w&oe=66FA2B80",
    numberOfMuturalFriends: 2},
    {
      userId: 2,
      userFullname: "Bogdan Randjelovic",
      userPicture: "https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.6435-1/74662494_2299750623463166_1663064976857759744_n.jpg?stp=dst-jpg_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=e4545e&_nc_ohc=CF_XUumXkz0Q7kNvgE_yN5G&_nc_ht=scontent.fbeg10-1.fna&_nc_gid=A1Nr9ArtthRpv0U4fqLiHP_&oh=00_AYB_RC2EWbHSIGZhoxajxZ8XQsl7vNVYbW6B9WQbX3C1tg&oe=67095FC2",
      numberOfMuturalFriends: 6
    }
  ]

  //peopleUserFullNames = ["Nemanja Savic", "Marko Stoijljkovic", "Bogdan Randjelovic"]
  peopleUserFullNames : string[];

  filteredOptions: string[];

  constructor(private store: Store<AppState>, private service: SportSocialService){
    // this.filteredOptions = this.options.slice();
    this.peopleUserFullNames = this.peopleOptions.map(peopleOption => peopleOption.userFullname);
    this.filteredOptions = this.peopleUserFullNames.slice()
  }
  ngOnInit(): void {
    // this.userFriend$ = this.store.select(userFriendsArraySelector)
    this.userFriendsAndNumberOfMuturalFriend$ = this.store.select(friendsAndNumberOfMuturalFriendsSelector)
    this.service.getAllUsersWithNameStartingWithString("nemanja").subscribe(user => console.log(user))
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.peopleUserFullNames.filter(o => o.toLowerCase().includes(filterValue));
    console.log(this.filteredOptions)
  }

  clicked(userId: number){
    console.log(userId);
  }

}

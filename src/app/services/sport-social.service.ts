import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class SportSocialService {

  constructor(private httpClient: HttpClient) { }

  private getStandardOption() : any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
      })
    };
  }

  getAllUsers(){
    return this.httpClient.get<User[]>("http://localhost:3000/" + "users");
  }

  addUser(user: User){
    let options = this.getStandardOption();
    console.log(user);

    options.headers = options.headers.set('Autorization', 'value-need-for-autorization');

    this.httpClient.post('db/sport-social-db.json', user, options);

  }
}

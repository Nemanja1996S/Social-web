import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

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

  private errorHandler = (error: HttpErrorResponse) => {
    const errorMessage =
      error.status === 0
        ? `Cant connect to API ${error.error}`
        : `Backend return code ${error.status}`
    return throwError(errorMessage);
  };

  getAllUsers(){
    return this.httpClient
    .get<User[]>(`${environment.apiUrl}/users`)
    .pipe(catchError(this.errorHandler));
  }

  getUserById(id: number){
    return this.httpClient
    .get<User>(`${environment.apiUrl}/users/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  getUser(email: string){
    return this.httpClient
    .get<User>(`${environment.apiUrl}/users?email=${email}`)
    .pipe(catchError(this.errorHandler));
  }

  addUser(user: User){
    let options = this.getStandardOption();
    console.log(user);

    options.headers = options.headers.set('Autorization', 'value-need-for-autorization');

    this.httpClient.post('db/sport-social-db.json', user, options);

  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { createPost, Post, ReactionEnum } from '../../models/Post';
import { Comments, CreateUserComment, UserComment } from '../../models/Comment';
import { UserFriends } from '../../models/UserFriends';
import { PeopleOption } from '../friends/friends.component';
import { UserPostReaction } from '../../models/PostReaction';
import { FriendRequest } from '../../models/Request';

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
    // const err = new Error(errorMessage);
    // return throwError(() => err);
  };

  getAllUsers(){
    return this.httpClient
    .get<User[]>(`${environment.apiUrl}/users`)
    .pipe(catchError(this.errorHandler));
  }

  getAllUsersWithNameStartingWithString(startingString: string){
    return this.httpClient
    .get<User[]>(`${environment.apiUrl}/users?name_like=^${startingString}.*`)// .get<User[]>(environment.apiUrl + "/users?name_like=^" + startingString +".*")
    .pipe(catchError(this.errorHandler));
  }

  getUserById(id: number){
    return this.httpClient
    .get<User>(`${environment.apiUrl}/users/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  getUser(email: string, password: string){   
    return this.httpClient
    .get<User>(`${environment.apiUrl}/users/login/user?email=${email}&password=${password}`)  
    .pipe(catchError(this.errorHandler));
  }

  postUser(user: User){   
    return this.httpClient.post<User>(environment.apiUrl + "/users",user)  
    .pipe(catchError(this.errorHandler));
  }

  getPostsForUser(userId: number){
    return this.httpClient
    .get<Post[]>(`${environment.apiUrl}/posts/forUser/${userId}`)
    .pipe(catchError(this.errorHandler));
  }

  getPostsOfUser(id: number){
    return this.httpClient
    .get<Post[]>(`${environment.apiUrl}/posts?userId=${id}&_limit=20&_sort=date&_order=desc`) //sortiranje po datum _sort=date&_order=desc, limit i range _start and _end or _limit (an X-Total-Count header is included in the response)
    .pipe(catchError(this.errorHandler));
  }

  getCommentsForPost(postId: number){
    return this.httpClient
      .get<Comments>(`${environment.apiUrl}/comments/${postId}`)
      .pipe(catchError(this.errorHandler));
  }

  getPostReactionsForUser(userId: number){
    return this.httpClient
      .get<UserPostReaction[]>(`${environment.apiUrl}/postReactions?userId=${userId}`)
      .pipe(catchError(this.errorHandler));
  }

  getFriendRequestsForUser(userId: number){
    return this.httpClient
      .get<FriendRequest[]>(`${environment.apiUrl}/requests?toUserId=${userId}`)
      .pipe(catchError(this.errorHandler));
  }

  getFriendsForUser(id: number){
    return this.httpClient
      .get<UserFriends>(`${environment.apiUrl}/userFriends/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getAllSports(){
    return this.httpClient
      .get<string[]>(`${environment.apiUrl}/sports`)
      .pipe(catchError(this.errorHandler));
  }

  addPost(userId: number, createPostObjectbody: createPost){
    return this.httpClient
      .post(`${environment.apiUrl}/posts/${userId}`, createPostObjectbody //options?
      )
  }

  editPost(postId: number, text: string | undefined, image: string | undefined){
    return this.httpClient
      .patch(`${environment.apiUrl}/posts/${postId}`, {text, image})
  }

  reactToPost(userId: number, postId: number, reactionEnum: ReactionEnum){
    console.log("reakcija:")
    console.log(reactionEnum)
    if(reactionEnum === ReactionEnum.like){
      return this.httpClient
      .patch(`${environment.apiUrl}/reactions/${postId}`, {userId: userId, reactionEnum: ReactionEnum.like})
    }
    else{
      return this.httpClient
      .patch(`${environment.apiUrl}/reactions/${postId}`, {userId: userId, reactionEnum: ReactionEnum.dislike})

    }
  }

  deletePost(postId: number){
    return this.httpClient
    .delete(`${environment.apiUrl}/posts/${postId}`)  //options?
  }

  makeCommentForPost(postId: number, comment: UserComment){
    const createComment: CreateUserComment = {
      userId: comment.userId,
      commentText: comment.commentText,
      commentPic: comment.commentPic
    }
    return this.httpClient
    .post(`${environment.apiUrl}/comments/${postId}`, createComment) //options?

  }

  addUser(user: User){
    let options = this.getStandardOption();
    console.log(user);

    options.headers = options.headers.set('Autorization', 'value-need-for-autorization');

    this.httpClient.post('db/sport-social-db.json', user, options);

  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MiniFriend2, UpdateUserDto, User, UserFromDatabase } from '../../models/User';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { createPost, Post, ReactionEnum } from '../../models/Post';
import { CommentEntityFromDatabase, Comments, CreateUserComment, UserComment } from '../../models/Comment';
// import { UserFriends } from '../../models/Friends';
import { PeopleOption } from '../friends/friends.component';
import { FriendRequest, FriendRequestFromDatabase, MiniFriendRequest } from '../../models/Request';
import { Friend, FriendFromDatabase } from '../../models/Friends';

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
    .get<User[]>(`${environment.apiUrl}/users/like/${startingString}`)// .get<User[]>(environment.apiUrl + "/users?name_like=^" + startingString +".*")
    .pipe(catchError(this.errorHandler));
  }

  getUserById(id: number){
    return this.httpClient
    .get<UserFromDatabase>(`${environment.apiUrl}/users/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  getUser(email: string, password: string){   
    return this.httpClient
    .get<UserFromDatabase>(`${environment.apiUrl}/users/login/user?email=${email}&password=${password}`)  
    .pipe(catchError(this.errorHandler));
  }

  deleteUser(userId: number){
    return this.httpClient
    .delete(`${environment.apiUrl}/users/${userId}`)
    .pipe(catchError(this.errorHandler));
  }

  editUser(updateUserDto: UpdateUserDto ){
    return this.httpClient
    .patch(`${environment.apiUrl}/users`, updateUserDto)
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
      .get<CommentEntityFromDatabase[]>(`${environment.apiUrl}/comments/userComment/${postId}`)
      .pipe(catchError(this.errorHandler));
  }

  editComment(userComment: UserComment, commentId: number){
    return this.httpClient
    .patch(`${environment.apiUrl}/comments/${commentId}`, userComment)  
  }


  deleteComment(commentId: number){
    return this.httpClient
    .delete(`${environment.apiUrl}/comments/${commentId}`)  
  }

  getFriendRequestsForUser(userId: number){
    return this.httpClient
      .get<FriendRequestFromDatabase[]>(`${environment.apiUrl}/requests/${userId}`)
      .pipe(catchError(this.errorHandler));
  }

  getRequestBetween(userId: number, friendId: number){
    console.log("Contacting api with userId: " + userId + " and friendId: " + friendId)
    return this.httpClient
    .get<MiniFriendRequest>(`${environment.apiUrl}/requests/${userId}/${friendId}`)
    .pipe(catchError(this.errorHandler));
  }

  addFriend(userId: number, friendId: number){
    return this.httpClient
      .post(`${environment.apiUrl}/friendship`, {userId: userId, friendId: friendId})
      .pipe(catchError(this.errorHandler));
  }

  removeFriend(userId: number, friendId: number){
    return this.httpClient
    .delete(`${environment.apiUrl}/friendship/${userId}/${friendId}`)
    .pipe(catchError(this.errorHandler));
  }

  deleteFriendRequest(friendRequestId: number){
    return this.httpClient
      .delete(`${environment.apiUrl}/requests/${friendRequestId}`)
      .pipe(catchError(this.errorHandler));
  }

  sendRequest(fromUserId: number, toUserId: number){
    return this.httpClient
      .post(`${environment.apiUrl}/requests`,{toUser: toUserId, fromUser: fromUserId})
      .pipe(catchError(this.errorHandler));
  }

  // getFriendsForUser(id: number){
  //   return this.httpClient
  //     .get<UserFriends>(`${environment.apiUrl}/userFriends/${id}`)
  //     .pipe(catchError(this.errorHandler));
  // }

  getFriendsForUser(friendsIds: number[]){
    const miniFriends: MiniFriend2[] = friendsIds.map(id => ({id: id}))
    return this.httpClient
      .post<FriendFromDatabase[]>(`${environment.apiUrl}/users/friendsAndTheirFriendsIds`, miniFriends) ///users/friends/${id}`)
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

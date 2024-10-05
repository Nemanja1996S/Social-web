import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';
import { FriendsComponent } from './friends/friends.component';
import { PersonProfileComponent } from './person-profile/person-profile.component';
import { RequestsComponent } from './requests/requests.component';

export const routes: Routes = [
    { path: 'home/profile/:userId', component: PersonProfileComponent},
    { path: 'home/user', component: PersonProfileComponent},
    { path: 'home/friends', component: FriendsComponent},
    { path: 'home/requests', component: RequestsComponent},
    { path: 'home/:postId', component: CommentComponent},
    { path: 'home', component: HomeComponent },
    { path: 'registry', component: RegistrationComponent },
    { path: '', component: LogInComponent },
    
    
    
    
    // { path: 'posts', component: PostComponent } home component (post + navbar)
];

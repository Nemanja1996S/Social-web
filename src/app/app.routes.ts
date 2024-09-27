import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';
import { FriendsComponent } from './friends/friends.component';
import { PersonProfileComponent } from './person-profile/person-profile.component';

export const routes: Routes = [
    { path: '', component: LogInComponent },
    { path: 'registry', component: RegistrationComponent },
    { path: 'home', component: HomeComponent  },
    { path: 'home/friends', component: FriendsComponent},
    { path: 'home/user', component: PersonProfileComponent},
    { path: 'home/:postId', component: CommentComponent}
    // { path: 'posts', component: PostComponent } home component (post + navbar)
];

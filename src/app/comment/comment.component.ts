import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Comment, UserComment } from '../../models/Comment';
import { NgFor } from '@angular/common';

@Component({
  selector: 'comment',
  standalone: true,
  imports: [MatCardModule,NgFor],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
  // MatButtonModule, MatIconModule,
  // CommonModule, ReactiveFormsModule, MatFormFieldModule,
  // MatInputModule, MatCheckboxModule
})
export class CommentComponent {
  comments : Comment[]= [{'postId' : 1 , 'usersComments' : [{'userId' : 1, 'userFullName': 'Nemanja Savic', 'userPicSrc' : 'https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.18169-1/969987_488172031277757_895038162_n.jpg?stp=c50.50.620.620a_dst-jpg_s160x160&_nc_cat=107&ccb=1-7&_nc_sid=312bcd&_nc_ohc=AYQcGVtt09QQ7kNvgEPWl6J&_nc_ht=scontent.fbeg10-1.fna&oh=00_AYAiqX-zih0ndWA239uG0Vv8Zzhvp00_L8KtYt1Lk1HZ3A&oe=67097EE0',
    'commentDate' : '12/2/2024', 'commentText' : 'neki komentar'}]},
    {'postId' : 2 , 'usersComments' : [{'userId' : 1, 'userFullName': 'Nemanja Savic', 'userPicSrc' : 'https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.18169-1/969987_488172031277757_895038162_n.jpg?stp=c50.50.620.620a_dst-jpg_s160x160&_nc_cat=107&ccb=1-7&_nc_sid=312bcd&_nc_ohc=AYQcGVtt09QQ7kNvgEPWl6J&_nc_ht=scontent.fbeg10-1.fna&oh=00_AYAiqX-zih0ndWA239uG0Vv8Zzhvp00_L8KtYt1Lk1HZ3A&oe=67097EE0',
      'commentDate' : '12/2/2024', 'commentText' : 'neki komentar'}]
   }]
  userComments : UserComment[] = [{'userId' : 1, 'userFullName': 'Nemanja Savic', 'userPicSrc' : 'https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.18169-1/969987_488172031277757_895038162_n.jpg?stp=c50.50.620.620a_dst-jpg_s160x160&_nc_cat=107&ccb=1-7&_nc_sid=312bcd&_nc_ohc=AYQcGVtt09QQ7kNvgEPWl6J&_nc_ht=scontent.fbeg10-1.fna&oh=00_AYAiqX-zih0ndWA239uG0Vv8Zzhvp00_L8KtYt1Lk1HZ3A&oe=67097EE0',
    'commentDate' : '12/2/2024', 'commentText' : 'neki komentarkdjkldjakld jdaskljd'}]
}

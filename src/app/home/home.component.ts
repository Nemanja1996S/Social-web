import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [NavbarComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

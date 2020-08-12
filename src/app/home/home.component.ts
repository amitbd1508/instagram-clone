import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService } from '../shared/firebase.service';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any [];
  faHeart;
  faComment;
  faPaperPlane;
  constructor(private firebase: FirebaseService) {
    this.faHeart = faHeart;
    this.faComment = faComment;
    this.faPaperPlane = faPaperPlane;
  }

  ngOnInit(): void {
    this.firebase.getPosts()
        .subscribe(data => {
          this.posts = data;
          console.log(this.posts);
        });
  }
}

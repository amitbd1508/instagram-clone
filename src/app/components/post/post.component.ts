import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/user';
import { AuthService } from '../../shared/auth.service';
import { faHeart, faComment, faPaperPlane, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { FirebaseService } from '../../shared/firebase.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  faHeart;
  faComment;
  faPaperPlane;
  faArrowAltCircleRight;

  @Input() user: User;

  constructor(public auth: AuthService, private firebase: FirebaseService) {
    this.faHeart = faHeart;
    this.faComment = faComment;
    this.faPaperPlane = faPaperPlane;
    this.faArrowAltCircleRight = faArrowAltCircleRight;
  }

  ngOnInit(): void {
    this.firebase.getUserById(this.user.uid)
        .subscribe(user => this.user = user);
  }

}

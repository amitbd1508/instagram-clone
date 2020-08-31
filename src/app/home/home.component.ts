import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService } from '../shared/firebase.service';
import { faHeart, faComment, faPaperPlane, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { Post } from '../shared/post';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LanguageChangeComponent } from '../components/language-change/language-change.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[];
  randomUser: User;
  faHeart;
  faComment;
  faPaperPlane;
  faArrowAltCircleRight;
  counter = 0;
  currentUser: User;

  constructor(private firebase: FirebaseService, public  auth: AuthService, private modalService: NgbModal,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    this.faHeart = faHeart;
    this.faComment = faComment;
    this.faPaperPlane = faPaperPlane;
    this.faArrowAltCircleRight = faArrowAltCircleRight;
    this.firebase.getUsers()
        .subscribe(data => {
          this.users = data;
          this.removeCurrentUser();
          if (this.users.length > 0 && this.counter === 0) {
            this.randomUser = this.users[0];
          }
          console.log(this.users);
        });
  }

  ngOnInit(): void {
  }

  nextUser(): void {
    this.counter++;
    if (this.users.length > this.counter) {
      this.randomUser = this.users[this.counter];
    } else {
      this.counter = 0;
      this.randomUser = this.users[this.counter];
    }
  }

  logOut(): void {
    this.auth.SignOut();
  }

  getUrl(post: Post) {
    return 'url(\'' + post.postedBy.photoURL + '\')';
  }

  gotToChat() {
    this.auth.gotToChat();
  }

  changeLanguage() {
    const modalRef = this.modalService.open(LanguageChangeComponent);
    modalRef.componentInstance.language = 'fr';
    modalRef.result.then((data) => {
    });
  }

  private removeCurrentUser() {
    if (!this.currentUser) {
      return;
    }

    const index = this.users.findIndex(data => data.uid === this.currentUser.uid);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

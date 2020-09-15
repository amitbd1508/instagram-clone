import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';
import { finalize } from 'rxjs/operators';
import { Post } from '../../shared/post';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { faLinkedin, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { NavigationService } from '../../shared/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {
  faLinkedin = faLinkedin;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  currentUser: User;

  @Input() showingUser: User;
  @Input() isOwnerProfile: boolean;

  loading = false;

  isFriend = false;
  numberOfFriends = 0;
  isReadOnly = false;

  constructor(public authService: AuthService,
              private firebaseService: FirebaseService,
              public navigation: NavigationService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    if (!this.showingUser) {
      if (this.navigation.isShowProfile) {
        this.isReadOnly = true;
        this.firebaseService.getUserById(this.navigation.selectedUser.uid)
            .subscribe(user => {
              this.showingUser = user;
              this.navigation.resetGotToUserProfile();
              this.getFriend();
            });
        this.isOwnerProfile = false;
      } else {
        this.showingUser = this.currentUser;
      }
    }

    if (!this.navigation.isShowProfile) {
      this.getFriend();
    }

    this.firebaseService.getUserById(this.currentUser.uid)
        .subscribe(user => {
          this.currentUser = user;
        });
  }

  getFriend() {
    if (this.currentUser.uid !== this.showingUser.uid) {
      for (const u of this.currentUser.friends) {
        if (u.uid === this.showingUser.uid) {
          this.isFriend = true;
          break;
        }
      }
    }
  }

  getFriendsCount() {
    this.firebaseService.getUserById(this.showingUser.uid)
        .subscribe(user => {
          this.numberOfFriends = user.friends.length;
        });
  }

  ngOnInit(): void {
    this.firebaseService.getUserById(this.currentUser.uid).subscribe(user => {
      this.currentUser = user;
      this.getFriend();
    });
  }

  onClickSubscribe() {
    this.firebaseService.addFriend(this.currentUser.uid, this.showingUser)
        .then(data => {
          this.getFriend();
        });
  }

  ngOnChanges(changes): void {
    this.isFriend = false;
    this.getFriend();
    this.getFriendsCount();
  }

  onClickChat(user: User) {
    this.navigation.goToChat(user);
  }
}

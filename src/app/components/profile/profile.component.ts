import { Component, Input, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  faLinkedin = faLinkedin;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  @Input() currentUser: User;
  @Input() isOwnerProfile: boolean;

  loading = false;

  constructor(public authService: AuthService,
              private firebaseService: FirebaseService,
              private storage: AngularFireStorage,
              public navigation: NavigationService
  ) {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  ngOnInit(): void {
    this.firebaseService.getUserById(this.currentUser.uid).subscribe(user => {
      this.currentUser = user;
    });
  }
}

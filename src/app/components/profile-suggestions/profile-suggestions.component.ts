import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';
import { user } from 'firebase-functions/lib/providers/auth';
import { Router } from '@angular/router';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-profile-suggestions',
  templateUrl: './profile-suggestions.component.html',
  styleUrls: ['./profile-suggestions.component.css']
})
export class ProfileSuggestionsComponent implements OnInit {
  users: User[];
  randomUser: User;
  currentUser: User;
  faArrowAltCircleRight;

  constructor(private firebase: FirebaseService, private router: Router, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.faArrowAltCircleRight = faArrowAltCircleRight;
  }

  ngOnInit(): void {
    this.firebase.getUsers()
        .subscribe(data => {
          this.users = data;
          this.removeCurrentUser();
          this.generateRandomUser();
        });
  }

  generateRandomUser(): void {
    const random = Math.floor(Math.random() * this.users.length);
    this.randomUser = this.users[random];
  }

  goToUserProfile(rUser: User) {
    console.log(rUser);
    this.userService.setUser(rUser);
    this.router.navigate(['user-profile']);
  }

  private removeCurrentUser() {
    if (!this.currentUser) { return; }

    const index = this.users.findIndex(data => data.uid === this.currentUser.uid);
    if (index !== -1) { this.users.splice(index, 1); }
  }
}

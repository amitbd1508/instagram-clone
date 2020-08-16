import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';
import { user } from 'firebase-functions/lib/providers/auth';

@Component({
  selector: 'app-profile-suggestions',
  templateUrl: './profile-suggestions.component.html',
  styleUrls: ['./profile-suggestions.component.css']
})
export class ProfileSuggestionsComponent implements OnInit {
  users: User[];
  randomUser: User;

  constructor(private firebase: FirebaseService) {
    this.firebase.getUsers()
        .subscribe(data => {
          this.users = data;
          this.generateRandomUser()
          console.log(this.users);
        });
  }

  ngOnInit(): void {
  }

  generateRandomUser(): void {
    const random = Math.floor(Math.random() * this.users.length);
    this.randomUser = this.users[random];
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user';
import { FirebaseService } from '../../shared/firebase.service';
import { Friend } from '../../shared/friend';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  currentUser: User;
  disable: boolean;
  friends: Friend[];

  constructor(private firebase: FirebaseService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    if (!this.currentUser) {
      this.disable = true;
    } else {
      this.disable = false;
    }

    this.getAllFriends();

    this.firebase.getUsers().subscribe(data => {
      this.getAllFriends();
    });
  }

  private getAllFriends() {
    this.firebase.getUserById(this.currentUser.uid)
        .subscribe(user => this.friends = user.friends);
  }
}

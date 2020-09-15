import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user';
import { FirebaseService } from '../../shared/firebase.service';
import { Friend } from '../../shared/friend';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../shared/navigation.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  currentUser: User;
  disable: boolean;
  friends: Friend[];

  constructor(private firebase: FirebaseService,
              private userSvc: UserService,
              public navigation: NavigationService) {
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

  gotToMessage(friend: Friend) {
    this.navigation.goToChat(friend);
  }

  private getAllFriends() {
    this.firebase.getUserById(this.currentUser.uid)
        .subscribe(user => this.friends = user.friends.slice(0, 5));
  }
}

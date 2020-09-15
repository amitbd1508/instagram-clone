import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';
import { Friend } from './friend';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  selectedUser: Friend;
  isShowProfile = false;

  constructor(private router: Router, private userSvc: UserService) { }

  gotToUserProfile(friend: Friend) {
    this.selectedUser = friend;
    this.isShowProfile = true;
    this.router.navigate(['profile']);
  }

  resetGotToUserProfile() {
    this.selectedUser = null;
    this.isShowProfile = false;
  }

  goToEditProfile() {
    this.router.navigate(['profile-edit']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToChat(friend) {
    this.userSvc.setChatFriend(friend);
    this.router.navigate(['chat']);
  }

  goToSearch() {
    this.router.navigate(['search']);
  }

  gotToFriendList() {
    this.router.navigate(['friends']);
  }
}

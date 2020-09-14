import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  constructor(private router: Router, private userSvc: UserService) { }

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
}

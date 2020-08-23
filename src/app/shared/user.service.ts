import { Injectable } from '@angular/core';
import { User } from './user';
import { Friend } from './friend';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userOfProfileView: User;
  private chatFriend: Friend;

  constructor() {
  }

  setUser(user: User) {
    this.userOfProfileView = user;
  }

  getUser() {
    return this.userOfProfileView;
  }

  setChatFriend(friend: Friend) {
    this.chatFriend = friend;
  }

  getChatFriend() {
    return this.chatFriend;
  }
}

import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userOfProfileView: User;

  constructor() {
  }

  setUser(user: User) {
    this.userOfProfileView = user;
  }

  getUser() {
    return this.userOfProfileView;
  }
}

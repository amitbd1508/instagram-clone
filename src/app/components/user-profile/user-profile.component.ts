import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../../shared/user';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public userSvc: UserService) { }

  user: User;
  ngOnInit(): void {
    this.user = this.userSvc.getUser();
    console.log(this.user);
  }

}

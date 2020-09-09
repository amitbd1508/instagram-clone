import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../../shared/user';
import { UserService } from '../../shared/user.service';
import { FirebaseService } from '../../shared/firebase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User;
  disable: boolean;
  isAlreadyFriend: boolean;
  loading = false;

  constructor(public userSvc: UserService, private firebaseSvc: FirebaseService, private toastr: ToastrService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    if (!this.currentUser) {
      this.showMessage('Please login for add friend', true);
      this.disable = true;
    } else {
      this.chalkIsAlreadyAdded();
    }
  }

  private chalkIsAlreadyAdded() {
    try{
      this.disable = false;
      this.firebaseSvc.getUserById(this.currentUser.uid)
          .subscribe(user => {
            this.isAlreadyFriend = false;
            for (const u of user.friends) {
              if (u.uid === this.userSvc.getUser().uid) {
                console.log('----', u);
                this.isAlreadyFriend = true;
                break;
              }
            }
          });
    } catch (e) {
      console.log(e);
      this.disable = true;
    }
  }

  showMessage(message: string, error: boolean = false): void {
    if (error) {
      this.toastr.error(message, 'Error', {
        timeOut: 2000,
      });
    } else {
      this.toastr.success(message, 'Message', {
        timeOut: 2000,
      });
    }
  }

  addFriend() {
    this.firebaseSvc.addFriend(this.currentUser.uid, this.userSvc.getUser())
        .then(data => {
          this.chalkIsAlreadyAdded();
        });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  constructor(private authService: AuthService, private firebaseService: FirebaseService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    console.log('++++', this.currentUser.uid);
    // this.firebaseService.getUserById(this.currentUser.uid).subscribe(user => this.currentUser = user);
  }

}

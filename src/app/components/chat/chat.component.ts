import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';
import { Friend } from '../../shared/friend';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;
  friends: Friend[];
  currentUser: User;
  divClass: string;
  idx = 0;

  constructor(private firebaseSvc: FirebaseService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.divClass = 'ui-g';
    this.firebaseSvc.getUserById(this.currentUser.uid)
        .subscribe(user => {
          this.friends = user.friends;
        });
  }

  onFormSubmit(value: any) {
    console.log(value);
  }

  sendMessage() {
    this.message = null;
  }

  onSelectChatUser(user: Friend, ind) {
    this.idx = ind;
    this.divClass = 'selected';
  }
}

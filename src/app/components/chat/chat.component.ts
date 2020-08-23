import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';
import { Friend } from '../../shared/friend';
import { Router } from '@angular/router';
import { Chat } from '../../shared/chat';
import { UserService } from '../../shared/user.service';
import { user } from 'firebase-functions/lib/providers/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;
  friends: Friend[];
  currentUser: User;
  idx = 0;
  chatMessages: Chat[];
  selectedFriend: Friend;
  currentChatId;
  loading = false;

  constructor(private firebaseSvc: FirebaseService, private router: Router, private userSvc: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.selectedFriend = this.userSvc.getChatFriend();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getAllMessage(this.currentUser, this.selectedFriend);
  }

  getAllMessage(currentUser: User, friend: Friend) {
    this.currentChatId = this.firebaseSvc.getChatId(currentUser.uid, friend.uid);
    this.firebaseSvc.getChatMessages(this.currentChatId)
        .subscribe(data => {
          this.chatMessages = data;
          console.log(this.chatMessages);
          this.loading = false;
        });

  }

  sendMessage() {
    if (!this.message) {
      console.log('empty message');
      return;
    }
    const chat = {} as Chat;
    chat.chatId = this.currentChatId;
    chat.createdAt = Date.now();
    chat.message = this.message;
    chat.type = 'text';
    chat.sender = this.currentUser as Friend;
    this.firebaseSvc.sendMessage(chat)
        .then(data => {
          console.log(data);
        });
    this.message = null;
  }

  onSelectChatUser(user: Friend, ind) {
    this.idx = ind;
    this.selectedFriend = user;
    this.loading = true;
    this.getAllMessage(this.currentUser, this.selectedFriend);
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}

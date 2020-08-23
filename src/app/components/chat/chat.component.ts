import { AfterViewChecked, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';
import { Friend } from '../../shared/friend';
import { Router } from '@angular/router';
import { Chat } from '../../shared/chat';
import { UserService } from '../../shared/user.service';
import { user } from 'firebase-functions/lib/providers/auth';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked  {
  @ViewChild('chatcontent') private chatcontent: ElementRef;

  moment: any = moment;
  message: string;
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
    if (!this.currentUser || !this.selectedFriend) {
      this.router.navigate(['home']);
    }
    this.loading = true;
    this.currentChatId = this.firebaseSvc.getChatId(this.currentUser.uid, this.selectedFriend.uid);
    console.log(this.currentChatId);
    this.firebaseSvc.getChatMessages(this.currentChatId)
        .subscribe(data => {
          this.chatMessages = data;
          console.log(this.chatMessages);
          this.loading = false;
          this.scrollToBottom();
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

  goToHome() {
    this.router.navigate(['home']);
  }

  scrollToBottom = () => {
    try {
      this.chatcontent.nativeElement.scrollTop = this.chatcontent.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
}

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
import { ChatService } from '../../shared/chat.service';

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
  idx = -1;
  chatMessages: Chat[];
  selectedFriend: Friend;
  currentChatId;
  loading = false;
  chatUsers: Friend[] = [];
  tracker;
  divClass: string;


  constructor(private chatService: ChatService, private router: Router, private userSvc: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.selectedFriend = this.userSvc.getChatFriend();
  }

  ngOnInit(): void {
    this.divClass = 'ui-g';
    if (!this.currentUser) {
      this.router.navigate(['home']);
    }
    this.loading = true;
    this.chatService.getChatsByUser(this.currentUser.uid)
        .subscribe(data => {
          console.log(data);
          this.chatUsers = [];
          this.tracker = new Set<string>();
          data.map(chat => {
            if (chat.senderId === this.currentUser.uid || chat.receiverId === this.currentUser.uid) {
              const prevTrackerSize = this.tracker.size;
              if (!(chat.senderId === this.currentUser.uid) ) {
                this.tracker.add(chat.senderId);
                if (this.tracker.size > prevTrackerSize) {
                  this.chatUsers.push(chat.sender);
                }
              } else if (!(chat.receiverId === this.currentUser.uid)) {
                this.tracker.add(chat.receiverId);
                if (this.tracker.size > prevTrackerSize) {
                  this.chatUsers.push(chat.receiver);
                }
              }
              console.log(this.tracker.size, this.chatUsers.length, prevTrackerSize);
            }
          });
          console.log(this.chatUsers);
          this.loading = false;
        });

    if (this.selectedFriend) {
      this.getMessagesForSelectedUser();
    }
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
    chat.userIds = [this.currentUser.uid, this.selectedFriend.uid];
    chat.receiver = this.selectedFriend;
    chat.senderId = this.currentUser.uid;
    chat.receiverId = this.selectedFriend.uid;
    chat.sender = this.currentUser as Friend;

    this.chatService.sendMessage(chat)
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

  onSelectChatUser(friend: Friend, ind) {
    this.idx = ind;
    this.divClass = 'selected';
    this.selectedFriend = friend;
    this.getMessagesForSelectedUser();
  }

  private getMessagesForSelectedUser() {
    this.currentChatId = this.chatService.getChatId(this.currentUser.uid, this.selectedFriend.uid);

    this.loading = true;
    this.chatService.getChatMessages(this.currentChatId)
        .subscribe(data => {
          this.chatMessages = data;
          console.log(this.chatMessages);
          this.loading = false;
          this.scrollToBottom();
        });
  }
}

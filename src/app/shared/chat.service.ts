import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from './chat';
import { User } from './user';
import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// @ts-ignore
export class ChatService {

  constructor(private firestore: AngularFirestore) { }

  getChatsByUser(uid): Observable<Chat[]> {
    return this.firestore
        .collection<Chat>('chat', ref => {
          return ref.where('userIds', 'array-contains', uid).orderBy('createdAt', 'asc');
        }).valueChanges();
  }

  getChatId(uid: string, uid2: string) {
    if (uid.localeCompare(uid2) === -1) { return `${uid}-${uid2}`; }
    else { return `${uid2}-${uid}`; }
  }

  getChatMessages(chatId: string): Observable<Chat[]> {
    return this.firestore
        .collection<Chat>('chat', ref => {
          return ref.where('chatId', '==', chatId).orderBy('createdAt', 'asc');
        }).valueChanges();
  }

  sendMessage(chat: Chat): Promise<any> {
    return  this.firestore.collection('chat').add(chat);
  }
}

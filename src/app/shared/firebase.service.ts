import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public postsCollectionRef: any;
  public postsCollection: any;
  private user: User;

  constructor(private firestore: AngularFirestore) {
    this.postsCollectionRef = this.firestore.collection<any>('posts', ref => ref.orderBy('createdAt', 'desc'));
    this.postsCollection = this.postsCollectionRef.valueChanges().pipe(shareReplay(1));
  }

  addPost(post): Promise<any> {
    console.log(post);
    return  this.firestore
        .collection('posts')
        .add(post);
  }

  getPosts(): Observable<any> {
    return this.postsCollection;
  }
}

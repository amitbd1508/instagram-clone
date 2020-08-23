import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from './user';
import { Post } from './post';
import { Comment } from './comment';
import { Friend } from './friend';
import { Chat } from './chat';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public postsCollectionRef: any;
  public postsCollection: any;

  public usersCollectionRef: any;
  public usersCollection: any;
  public chatCollectionRef = this.firestore.collection('chat');
  private user: User;

  constructor(private firestore: AngularFirestore) {
    this.postsCollectionRef = this.firestore.collection<Post>('posts', ref => ref.orderBy('createdAt', 'desc'));
    this.usersCollectionRef = this.firestore.collection<User>('users');
    this.chatCollectionRef = this.firestore.collection<User>('chat');
    this.postsCollection = this.postsCollectionRef.valueChanges().pipe(shareReplay(1));
    this.usersCollection = this.usersCollectionRef.valueChanges().pipe(shareReplay(1));
  }

  addPost(post: Post): Promise<any> {
    return  this.firestore
        .collection('posts')
        .doc(post.id)
        .set(post);
  }

  getPosts(): Observable<any> {
    return this.postsCollection;
  }

  getUsers(): Observable<any> {
    return this.usersCollection;
  }

  getPostId(): string {
    return this.firestore.createId();
  }

  addComment(uid: string, comment: Comment) {
    let user: User;
    return this.firestore.collection('users').doc(uid).get().subscribe(data => {
      user = data.data() as User;
      user.comments.push(comment);

      return this.firestore
          .collection('users')
          .doc(uid)
          .set(user, {merge: true});
    });
  }

  getUserById(id: string): Observable<User> {
    const productsDocuments = this.firestore.doc<User>('users/' + id);
    return productsDocuments.snapshotChanges()
        .pipe(
            map(changes => {
              const data = changes.payload.data();
              const uid = changes.payload.id;
              return { uid, ...data };
            }));
  }

  updateUser(currentUser: User) {
    const update = {
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL
    };
    return this.firestore.collection('users').doc(currentUser.uid).update(update);
  }

  addFriend(userId, user: User): Promise<any> {
    let currentUser: User;
    const friend: Friend = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email
    };
    return new Promise( (resolve, reject) => {
      this.firestore.collection('users').doc(userId).get().subscribe(data => {
        currentUser = data.data() as User;
        currentUser.friends.push(friend);

        this.firestore
            .collection('users')
            .doc(userId)
            .set(currentUser, {merge: true})
            .then(d => {
              resolve(d);
            }).catch(e => reject(e));
      });
    });
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

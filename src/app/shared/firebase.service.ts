import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from './user';
import { Post } from './post';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public postsCollectionRef: any;
  public postsCollection: any;

  public usersCollectionRef: any;
  public usersCollection: any;
  private user: User;

  constructor(private firestore: AngularFirestore) {
    this.postsCollectionRef = this.firestore.collection<Post>('posts', ref => ref.orderBy('createdAt', 'desc'));
    this.usersCollectionRef = this.firestore.collection<User>('users');
    this.postsCollection = this.postsCollectionRef.valueChanges().pipe(shareReplay(1));
    this.usersCollection = this.usersCollectionRef.valueChanges().pipe(shareReplay(1));
  }

  addPost(post: Post): Promise<any> {
    console.log(post);
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

  addComment(postId: string, comment: Comment) {
    let post: Post;
    this.firestore.collection('posts').doc(postId).get().subscribe(data => {
      post = data.data() as Post;
      post.comments.push(comment);

      return this.firestore
          .collection('posts')
          .doc(postId)
          .set(post);
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
}

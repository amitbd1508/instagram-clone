import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from './user';
import { Post } from './post';
import { Comment } from './comment';

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
}

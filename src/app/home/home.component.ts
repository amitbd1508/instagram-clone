import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService } from '../shared/firebase.service';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  posts: any [];
  faHeart;
  faComment;
  faPaperPlane;
  constructor(private storage: AngularFireStorage, private firebase: FirebaseService) {
    this.faHeart = faHeart;
    this.faComment = faComment;
    this.faPaperPlane = faPaperPlane;
  }

  ngOnInit(): void {
    this.firebase.getPosts()
        .subscribe(data => {
          this.posts = data;
          console.log(this.posts);
        });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    this.uploadFile(this.selectedFile);
  }

  uploadFile(image): void {
    const n = Date.now();
    const file = image;
    const filePath = `post-images/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
        .snapshotChanges()
        .pipe(
            finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe(url => {
                if (url) {
                  this.fb = url;
                  console.log('===', url);
                  const post = {
                    image: url,
                    description: `This is a simple post ${Date.now()}`,
                    postedBy: {
                      name: 'Amit Ghosh',
                      username: 'amit.ghosh'
                    },
                    createdAt: Date.now()
                  };

                  this.firebase.addPost(post)
                      .then(data => {
                        console.log(data);
                      });
                }
              });
            })
        )
        .subscribe(url => {
          if (url) {
            console.log('++++', url.downloadURL);
          }
        });
  }
}

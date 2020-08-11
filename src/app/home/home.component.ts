import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event): void {
    const n = Date.now();
    const file = event.target.files[0];
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
                }
                console.log(this.fb);
              });
            })
        )
        .subscribe(url => {
          if (url) {
            console.log(url);
          }
        });
  }
}

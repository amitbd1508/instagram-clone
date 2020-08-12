import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from '../../shared/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  selectedFile: File = null;
  selectedFileUrl: any = null;
  description = '';
  fb;
  downloadURL: Observable<string>;
  loading = false;

  constructor(private firebase: FirebaseService, private storage: AngularFireStorage, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  addPost(): void {
    this.loading = true;
    if (this.selectedFile && this.description) {
      this.uploadFile(this.selectedFile);
    } else {
      this.loading = false;
      this.showMessage('Please select a file and type a description', true);
    }
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    const mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.showMessage('Please select an image', true);
      this.loading = false;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.selectedFileUrl = reader.result;
    };
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
                    description: this.description,
                    postedBy: {
                      name: 'Amit Ghosh',
                      username: 'amit.ghosh'
                    },
                    createdAt: Date.now()
                  };

                  this.firebase.addPost(post)
                      .then(data => {
                        console.log('posted');
                        this.selectedFileUrl = null;
                        this.selectedFile = null;
                        this.description = '';
                        this.showMessage('Posted');
                        this.loading = false;
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

  showMessage(message: string, error: boolean = false): void {
    if (error) {
      this.toastr.error(message, 'Error', {
        timeOut: 2000,
      });
    } else {
      this.toastr.success(message, 'Message', {
        timeOut: 2000,
      });
    }
  }

}

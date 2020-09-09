import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';
import { finalize } from 'rxjs/operators';
import { Post } from '../../shared/post';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { faLinkedin, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  faLinkedin = faLinkedin;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  @Input() currentUser: User;
  @Input() isOwnerProfile: boolean;

  selectedFile: File = null;
  selectedFileUrl: any = null;
  description = '';
  fb;
  downloadURL: Observable<string>;
  loading = false;

  constructor(public authService: AuthService,
              private firebaseService: FirebaseService,
              private storage: AngularFireStorage,
              private toastr: ToastrService
  ) {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  ngOnInit(): void {
    this.firebaseService.getUserById(this.currentUser.uid).subscribe(user => {
      this.currentUser = user;
      console.log(user);
      console.log(this.currentUser);
    });
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
    const filePath = `profile-images/${n}`;
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
                  this.currentUser.photoURL = url;
                  this.firebaseService.updateUser(this.currentUser)
                      .then(data => {
                        this.loading = false;
                      });
                }
              });
            })
        )
        .subscribe(url => {
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

  updateProfile() {
    this.loading = true;
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile);
    } else if (this.currentUser.displayName.length > 3) {
      this.firebaseService.updateUser(this.currentUser)
          .then(data => {
            this.loading = false;
          });
    } else {
      this.loading = false;
      this.showMessage('Filed cannot be empty', true);
    }
  }
}

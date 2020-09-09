import { Component, OnInit } from '@angular/core';
import { ImageType, User } from '../../shared/user';
import { AuthService } from '../../shared/auth.service';
import { FirebaseService } from '../../shared/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  currentUser: User;
  selectedFileProfile: File = null;
  selectedFileUrlProfile: any = null;

  selectedFilePrimary: File = null;
  selectedFileUrlPrimary: any = null;

  selectedFileSecondary: File = null;
  selectedFileUrlSecondary: any = null;

  fb;
  loading = false;

  constructor(public authService: AuthService,
              private firebaseService: FirebaseService,
              private storage: AngularFireStorage,
              private toastr: ToastrService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.firebaseService.getUserById(this.currentUser.uid).subscribe(user => {
      this.currentUser = user;
    });
  }

  uploadFile(image, imageType: ImageType): void {
    const n = Date.now();
    const file = image;
    const filePath = `${imageType.toString()}/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
        .snapshotChanges()
        .pipe(
            finalize(() => {
              const downloadURL = fileRef.getDownloadURL();
              downloadURL.subscribe(url => {
                console.log(url);
                if (url) {
                  this.fb = url;
                  if (imageType === ImageType.PROFILE) {
                    this.currentUser.photoURL = url;
                  } else if (imageType === ImageType.PRIMARY) {
                    this.currentUser.primaryPhotoURL = url;
                  } else if (imageType === ImageType.SECONDARY) {
                    this.currentUser.secondaryPhotoURL = url;
                  }

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

  updateProfile(selectedFile, imageType: ImageType) {
    this.loading = true;
    if (selectedFile) {
      this.uploadFile(selectedFile, imageType);
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

  onFileSelectedProfile(event) {
    this.selectedFileProfile = event.target.files[0];
    const mimeType = this.selectedFileProfile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.showMessage('Please select an image', true);
      this.loading = false;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFileProfile);
    reader.onload = () => {
      this.selectedFileUrlProfile = reader.result;
      this.updateProfile(this.selectedFilePrimary, ImageType.PRIMARY);
    };
  }

  onFileSelectedPrimary(event) {
    this.selectedFilePrimary = event.target.files[0];
    const mimeType = this.selectedFilePrimary.type;
    if (mimeType.match(/image\/*/) == null) {
      this.showMessage('Please select an image', true);
      this.loading = false;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFilePrimary);
    reader.onload = () => {
      this.selectedFileUrlPrimary = reader.result;
      this.updateProfile(this.selectedFilePrimary, ImageType.PRIMARY);
    };
  }

  onFileSelectedSecondary(event) {
    this.selectedFileSecondary = event.target.files[0];
    const mimeType = this.selectedFileSecondary.type;
    if (mimeType.match(/image\/*/) == null) {
      this.showMessage('Please select an image', true);
      this.loading = false;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFileSecondary);
    reader.onload = () => {
      this.selectedFileUrlSecondary = reader.result;
      this.updateProfile(this.selectedFileSecondary, ImageType.SECONDARY);
    };
  }
}

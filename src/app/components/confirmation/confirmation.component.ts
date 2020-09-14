import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  currentUser: User;
  constructor(
      public dialogRef: MatDialogRef<string>,
      private firebase: FirebaseService,
      private authSvc: AuthService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onUpdateDrugClick() {
    this.firebase.deleteAccount(this.currentUser.uid)
        .then(data => {
          this.authSvc.SignOut();
          this.dialogRef.close();
        });
  }
}

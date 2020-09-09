import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { user } from 'firebase-functions/lib/providers/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
      public afs: AngularFirestore,   // Inject Firestore service
      public afAuth: AngularFireAuth, // Inject Firebase auth service
      private firebaseService: FirebaseService,
      public router: Router,
      private userSvc: UserService,
      public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    return (currentUser !== null && currentUser.emailVerified !== false);
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.firebaseService.getUserById(result.user.uid)
              .subscribe(currentUser => {
                this.userData = currentUser;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
                this.ngZone.run(() => {
                  this.router.navigate(['home']);
                });
                console.log(result.user, '====');
              });

          // this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message);
        });
  }

  // Sign up with email/password
  SignUp(name, email, password) {
    console.log('---', name);
    return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['sign-in']);
          });
          this.SendVerificationMail();
          this.SetUserData(result.user, name);
        }).catch((error) => {
          window.alert(error.message);
        });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    // return this.afAuth.currentUser.sendEmailVerification()
    //     .then(() => {
    //       this.router.navigate(['verify-email-address']);
    //     });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email sent, check your inbox.');
        }).catch((error) => {
          window.alert(error);
        });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error);
        });
  }

  SetUserData(loggedInUser, userName?) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${loggedInUser.uid}`);
    const currentUser: User = {
      uid: loggedInUser.uid,
      email: loggedInUser.email,
      comments: [],
      displayName: loggedInUser.displayName ? loggedInUser.displayName : userName,
      photoURL: loggedInUser.photoURL ? loggedInUser.photoURL : 'https://f0.pngfuel.com/png/340/956/profile-user-icon-png-clip-art-thumbnail.png',
      primaryPhotoURL: 'https://f0.pngfuel.com/png/340/956/profile-user-icon-png-clip-art-thumbnail.png',
      secondaryPhotoURL: 'https://f0.pngfuel.com/png/340/956/profile-user-icon-png-clip-art-thumbnail.png',
      friends: [],
      language: 'en',
      emailVerified: true,
      createdAt: Date.now(),
    };
    return userRef.set(currentUser, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  goToSignIn() {
    this.router.navigate(['sign-in']);
  }
  goToSignUp() {
    this.router.navigate(['register-user']);
  }

  gotToHome() {
    this.router.navigate(['home']);
  }

  goToUserProfile(postedBy: User) {
    this.userSvc.setUser(postedBy);
    this.router.navigate(['user-profile']);
  }

  gotToChat() {
    this.router.navigate(['chat']);
  }

  goToSettingPage() {
    this.router.navigate(['setting']);
  }
}

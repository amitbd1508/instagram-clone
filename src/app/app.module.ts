import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';

const firebaseConfig = {
  apiKey: 'AIzaSyBszKfsV_mNpLJL9oO3DCIi5PP7PCjLMLk',
  authDomain: 'instagram-445ad.firebaseapp.com',
  databaseURL: 'https://instagram-445ad.firebaseio.com',
  projectId: 'instagram-445ad',
  storageBucket: 'instagram-445ad.appspot.com',
  messagingSenderId: '1087806706733',
  appId: '1:1087806706733:web:a8d1bc536d667a17f1d4a4',
  measurementId: 'G-T1WDQXDTLL'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

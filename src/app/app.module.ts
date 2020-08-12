import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommentComponent } from './component/comment/comment.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

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
    HomeComponent,
    CommentComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    AngularFireStorageModule,
    FlexLayoutModule,
    MatButtonModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    NgxLoadingModule.forRoot({}),
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

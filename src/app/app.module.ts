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
import { CommentComponent } from './components/comment/comment.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProfileSuggestionsComponent } from './components/profile-suggestions/profile-suggestions.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageChangeComponent } from './components/language-change/language-change.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './components/settings/settings.component';
import { PostComponent } from './components/post/post.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

const firebaseConfig = {
  apiKey: 'AIzaSyAGcKlVLcqGbXs7HuscnYTycIVjkyr2xbg',
  authDomain: 'instagram-fr.firebaseapp.com',
  databaseURL: 'https://instagram-fr.firebaseio.com',
  projectId: 'instagram-fr',
  storageBucket: 'instagram-fr.appspot.com',
  messagingSenderId: '816140624763',
  appId: '1:816140624763:web:e43b527ee289d9d9d4d3de',
  measurementId: 'G-1896YRBB7R'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommentComponent,
    AddPostComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfileComponent,
    SearchComponent,
    ProfileSuggestionsComponent,
    AdvertisementComponent,
    UserProfileComponent,
    FriendListComponent,
    ChatComponent,
    LanguageChangeComponent,
    SettingsComponent,
    PostComponent,
    UserProfileEditComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
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
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    NgbModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

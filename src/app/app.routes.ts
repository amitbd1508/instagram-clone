import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { SearchComponent } from './components/search/search.component';
import { SearchProfileComponent } from './components/search-profile/search-profile.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile-edit', component: UserProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'setting', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchProfileComponent, canActivate: [AuthGuard]},
  {path: 'friends', component: SubscriptionListComponent, canActivate: [AuthGuard]},
];

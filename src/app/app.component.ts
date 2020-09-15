import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from './shared/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;
  constructor(public authService: AuthService, private translate: TranslateService) {
    const lng = localStorage.getItem('language');
    if (!lng) {
      translate.setDefaultLang('en');
      localStorage.setItem('language', 'en');
    }
    translate.setDefaultLang(lng);
    this.currentUser = JSON.parse(localStorage.getItem('user'));

  }

  title = 'OP SCIENCES PVT';
}

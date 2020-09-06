import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  title = 'OP SCIENCES PVT';
}

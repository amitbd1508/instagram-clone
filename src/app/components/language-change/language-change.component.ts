import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-language-change',
  templateUrl: './language-change.component.html',
  styleUrls: ['./language-change.component.css']
})
export class LanguageChangeComponent implements OnInit {

  language: string;
  constructor(private translation: TranslateService, public activeModal: NgbActiveModal) {
    this.language = localStorage.getItem('language');
  }

  ngOnInit(): void {
    this.language = localStorage.getItem('language');
    console.log(this.language);
    if (!this.language) {
      this.language = 'fr';
    }
  }

  changeLanguage(lng: string) {
    this.language = lng;
    this.translation.setDefaultLang(lng);
    localStorage.setItem('language', lng);
  }
}

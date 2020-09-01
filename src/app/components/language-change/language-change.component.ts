import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-language-change',
  templateUrl: './language-change.component.html',
  styleUrls: ['./language-change.component.css']
})
export class LanguageChangeComponent implements OnInit {

  @Input() language: string;
  constructor(private translation: TranslateService, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  changeLanguage(lng: string) {
    this.language = lng;
    this.translation.setDefaultLang(lng);
  }
}

import { Component, OnInit } from '@angular/core';
import { LanguageChangeComponent } from '../language-change/language-change.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private modalService: NgbModal,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onClickChangeLanguage() {
    const modalRef = this.modalService.open(LanguageChangeComponent);
    modalRef.result.then((data) => {
    });
  }

  onClickDeleteAccount() {
    this.dialog.open(ConfirmationComponent, {
      hasBackdrop: true
    });
  }
}

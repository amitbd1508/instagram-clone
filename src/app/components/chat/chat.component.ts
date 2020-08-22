import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatForm: any;
  message: string;

  constructor() { }

  ngOnInit(): void {
    this.chatForm = new FormGroup({
      message: new FormControl()
    });
  }

  onFormSubmit(value: any) {
    console.log(value);
  }

  sendMessage() {
    
  }
}

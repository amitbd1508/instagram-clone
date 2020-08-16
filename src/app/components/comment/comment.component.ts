import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/firebase.service';
import { User } from '../../shared/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Comment } from '../../shared/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  currentUser: User;
  message = '';
  disable: boolean;

  @Input() postId: string;

  constructor(private firebase: FirebaseService, private toastr: ToastrService, private  router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    if (!this.currentUser) {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }

  showMessage(message: string, error: boolean = false): void {
    if (error) {
      this.toastr.error(message, 'Error', {
        timeOut: 2000,
      });
    } else {
      this.toastr.success(message, 'Message', {
        timeOut: 2000,
      });
    }
  }

  addComment() {
    const comment: Comment = {
      message: this.message,
      createdAt: Date.now(),
      postedBy: this.currentUser
    };

    this.firebase.addComment(this.postId, comment);
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user';
import { Friend } from '../../shared/friend';
import { FirebaseService } from '../../shared/firebase.service';
import { UserService } from '../../shared/user.service';
import { NavigationService } from '../../shared/navigation.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  currentUser: User;
  friends: Friend[];
  filteredStates: Observable<Friend[]>;


  constructor(private firebase: FirebaseService,
              private navigation: NavigationService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.friends = this.currentUser.friends;
  }

  ngOnInit(): void {
    this.getAllFriends();

    this.firebase.getUsers().subscribe(data => {
      this.getAllFriends();
    });

    this.filteredStates = this.firebase.getUserById(this.currentUser.uid)
        .pipe(
            map(user => user.friends)
        );
  }

  private getAllFriends() {
    this.firebase.getUserById(this.currentUser.uid)
        .subscribe(user => {
          this.friends = user.friends;
          console.log(this.friends);
        });
  }

  goToUserProfile(user: Friend) {
    this.navigation.gotToUserProfile(user);
  }
}

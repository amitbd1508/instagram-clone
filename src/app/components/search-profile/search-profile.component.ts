import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FirebaseService } from '../../shared/firebase.service';
import { UserService } from '../../shared/user.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../shared/user';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css']
})
export class SearchProfileComponent implements OnInit {

  stateCtrl = new FormControl();
  filteredStates: Observable<User[]>;

  users: User[] = [];
  currentUser: User;

  constructor(private firebase: FirebaseService, private userSvc: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    this.firebase.getUsers()
        .subscribe(data => {
          this.users = data;
        });

    this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
            startWith(''),
            map(user => user ? this._filterStates(user) : this.users.slice())
        );

    if (this.currentUser) {
      this.firebase.getUserById(this.currentUser.uid)
          .subscribe(user => this.currentUser = user);
    }
    console.log(this.currentUser.friends);
  }

  ngOnInit(): void {
  }

  goToUserProfile(user) {

  }

  private _filterStates(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(user => user.displayName.toLowerCase().indexOf(filterValue) === 0);
  }
}

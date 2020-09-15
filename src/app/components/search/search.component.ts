import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../shared/user';
import { FirebaseService } from '../../shared/firebase.service';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../shared/navigation.service';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<User[]>;

  users: User[] = [];
  currentUser: User;

  constructor(private firebase: FirebaseService,
              private userSvc: UserService,
              private route: Router, public navigation: NavigationService) {
    this.firebase.getUsers()
        .subscribe(data => {
          this.users = data;
        });

    this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
            startWith(''),
            map(user => user ? this._filterStates(user) : this.users.slice())
        );
  }

  ngOnInit(): void {
  }

  goToUserProfile(user: User) {
    this.userSvc.setUser(user);
    this.route.navigate(['user-profile']);
  }

  private _filterStates(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(user => user.displayName.toLowerCase().indexOf(filterValue) === 0);
  }
}

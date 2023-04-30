import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Location } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent {

  constructor(private userService: UserService,
              private location:  Location) { }
  
  users: User[] = [];

  getIdLogin(){
    return this.userService.getIdLogin();
  }

  ngOnInit(): void {
    this.getFollowers();
  }

  getFollowers(): void {
    this.userService.getFollowers()
      .subscribe(users => this.users = users);
  }

  goBack(): void {
    this.location.back();
  }


}

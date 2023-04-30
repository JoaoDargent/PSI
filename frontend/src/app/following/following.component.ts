import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Location } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent {
  
  constructor(private userService: UserService,
    private location:  Location) { }

  users: User[] = [];

  getIdLogin(){
    return this.userService.getIdLogin();
  }

  ngOnInit(): void {
    this.getFollowing();
  }

  getFollowing(): void {
    this.userService.getFollowing()
      .subscribe(users => this.users = users);
  }

  goBack(): void {
    this.location.back();
  }

}

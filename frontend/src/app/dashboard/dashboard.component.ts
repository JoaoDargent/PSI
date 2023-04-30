import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

 

  constructor(private userService: UserService, 
              private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  getIdLogin(){
    return this.userService.getIdLogin();
  }


}
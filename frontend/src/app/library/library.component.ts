import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Location } from '@angular/common';
import { Item } from '../item';
import { ListItems } from '../lists';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {

  constructor(private userService: UserService,
    private location:  Location) { }

  items: Item[] = [];

  getIdLogin(){
    return this.userService.getIdLogin();
  }

  ngOnInit(): void {
    this.getLibrary();
  }
  getLibrary(): void {
    this.userService.getLibrary()
      .subscribe(items => this.items= items);
  }

  goBack(): void {
    this.location.back();
  }

}

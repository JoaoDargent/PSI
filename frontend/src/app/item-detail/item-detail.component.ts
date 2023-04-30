import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../service/item.service';
import { Item } from '../item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})

export class ItemDetailComponent implements OnInit {
  item: Item | undefined;
  selectedOption:String = "";

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItems();
  }
  
  getItems(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);
  }
  goBack(): void {
    this.location.back();
  }

}



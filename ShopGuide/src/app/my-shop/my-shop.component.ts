import { Component, OnInit } from '@angular/core';
import { ShopModel } from '../shop-list/shop.model';
import { MyShopService } from '.././my-shop.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-my-shop',
  templateUrl: './my-shop.component.html',
  styleUrls: ['./my-shop.component.css']
})
export class MyShopComponent implements OnInit {
  title: String = "Shop List";
  public login = { location_type: "", category_type: ""};
  shops: ShopModel[];
  // image properties
  imageWidth: number = 50;
  imageMargin: number = 2;
  constructor(private myshopservice:MyShopService,private router: Router,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    // var id = localStorage.getItem("ownerId");
    // console.log(id);
    this.myshopservice.getShops()
    .subscribe((data) => {
      this.shops = JSON.parse(JSON.stringify(data));
    });
  }
  deleteShop(id): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.myshopservice.deleteShop(id)
        .subscribe((data) => {
          this.shops = JSON.parse(JSON.stringify(data));
          //console.log("deleted" + data);
          //this.router.navigate(['/']);
        });
    }
    else {
      this.router.navigate(['/']);
    }
  }

}

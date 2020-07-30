import { Component, OnInit } from '@angular/core';
import { ShopModel } from './shop.model';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  title: String = "Shop List";
  public login = { location_type: "", category_type: "" };
  // Product is the model class for a product item
  shops: ShopModel[];
  // image properties
  imageWidth: number = 50;
  imageMargin: number = 2;
  constructor(private shopService: ShopService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    // if(!!(this._route.params.subscribe(params => {
    //   this.login.location_type = params['loc'];
    // }))){
    //     this._route.params.subscribe(params => {
    //     this.login.category_type = params['cat'];
    //     this.login.location_type = params['loc'];
    //   });
    //   console.log("login");
    //   console.log(this.login);
    //   this.shopService.getFilterShop(this.login)
    //     .subscribe((data) => {
    //       console.log(data);
    //       this.shops = JSON.parse(JSON.stringify(data));
    //     });
    // }
    // else {
      this.shopService.getShops()
        .subscribe((data) => {
          this.shops = JSON.parse(JSON.stringify(data));
        });
      
      // }
  }
  deleteShop(id): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.shopService.deleteShop(id)
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

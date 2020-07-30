import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
import { ShopModel } from './new-shop.model';
import { from } from 'rxjs';
@Component({
  selector: 'app-new-shop',
  templateUrl: './new-shop.component.html',
  styleUrls: ['./new-shop.component.css']
})
export class NewShopComponent implements OnInit {
  title: String = "Add Shop";
  constructor(private shopService: ShopService, private router: Router) { }
  shopItem = new ShopModel(null, null,null, null, null, null);
  

  ngOnInit(): void {
  }
  AddShop() {
    console.log(this.shopItem);
    this.shopService.newShop(this.shopItem);
    setTimeout (() => {
      //this.productService.newProduct(this.productItem);
      // alert("Hello from setTimeout");
      console.log("called");
    console.log(this.shopItem);
    alert("success");
    this.router.navigate(['/shops']);
   }, 1000);

    
  }

}

import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
import { ShopModel } from '../shop-list/shop.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.css']
})
export class EditShopComponent implements OnInit {
  title:String = "Edit Shop";
  p_id="";
  constructor(private _route:ActivatedRoute, private shopService: ShopService,private router: Router) { }
  editItem = new ShopModel(null,null,null,null,null,null);
  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      this.p_id = params['p_id'];
  });
  this.shopService.editShop(this.p_id).subscribe((data)=>{
    this.editItem=JSON.parse(JSON.stringify(data));
    //console.log(data);
    // console.log(this.editItem);                 
  });
}
updateShop(){
this.shopService.updateShop(this.editItem);
setTimeout (() => {
console.log("called");
  // console.log(this.productItem);
  alert("success");
  this.router.navigate(['/shops']);
}, 1000);
}

}

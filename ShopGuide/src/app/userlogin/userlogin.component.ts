import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ShopModel } from '../shop-list/shop.model';
import { Subscriber } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  locationlist: [];
  // categorylist: [];
  public login = { location_type: "", category_type: ""};
  loginobjarr = <any>[];
  public shoplist = [];
  msg = "";
  // location_type = [ "Palakkad" ,"Mannarkkad" , "Nemmara" , "Ottappalam"];
  categorylist = [ "Super market" ,"Women botique" , "Bakery" , "Grocery" , "Jewellery"];
  constructor(private shopService: ShopService,private _router:Router) { }
  // userLogin(){
  //   this.shopService.userUnlock()
  // }
  ngOnInit(): void {
    this.getLocation();
    // if(this.login.location_type == "" && this.login.category_type == "" ){
    //   this.getShops();
    // }
    // else{
    //   this.userLogin();
    // }
    
  }

  
  getLocation(){
    this.shopService.getShops()
    .subscribe(
      res => {
              console.log(res);
              this.loginobjarr = JSON.parse(JSON.stringify(res));
              this.locationlist = this.loginobjarr.map(({shopLocation}) => shopLocation);
              console.log(this.loginobjarr);
              console.log(this.locationlist);
              return this.locationlist;
      },
      err => {
              console.log(err);
              this.msg = err.error;
      }
              // err => console.log(err)
    )  
  }
  

  getShops(){
    this.shopService.getShops()
    .subscribe((data) => {
      this.shoplist = JSON.parse(JSON.stringify(data));
    });
  }
  
  
  userLogin(){
    console.log('shoplist/'+ this.login.location_type+'/'+this.login.category_type);
  this._router.navigate(['shoplist/'+ this.login.location_type+'/'+this.login.category_type]);
  }
}

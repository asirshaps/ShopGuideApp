import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import{  ShopService } from './shop.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private shopService:ShopService,private _router:Router)
  {

  }
  canActivate():boolean{
    if(this.shopService.loggedIn())
      {
        console.log('true')
        return true
      }
    else{
        this._router.navigate(['/login'])
        return false
    }  

  }
}

import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registeredUser={email:"",password:""};
  constructor(private shopService: ShopService,private _router:Router) { }
  registerUser(){
    this.shopService.registerUser(this.registeredUser)
    .subscribe(
      res=>{
        console.log(res),
        localStorage.setItem("token",res["token"]);
        this._router.navigate(['/login'])
}
      ,
      err=>console.log(err)
    )
}
  ngOnInit(): void {
  }

}

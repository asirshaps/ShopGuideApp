import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginUserDetails={email:"",password:""};
  constructor(private shopService: ShopService,private _router:Router) { }
  loginUser()
  {
    
    this.shopService.loginUser(this.loginUserDetails)
    .subscribe(
      res=>{
        console.log(res);
          const payload = res["payload"];
        localStorage.setItem("token",res["token"]);
        localStorage.setItem("ownerId",payload.subject);
        // console.log("payload.ownerId");
        this._router.navigate(['/shops'])
},
      err=>console.log(err)
    )
  }
  ngOnInit(): void {
  }

}

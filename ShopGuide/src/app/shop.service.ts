import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private _registerUrl = "http://localhost:3000/register";
  private _loginUrl = "http://localhost:3000/login";
  constructor(private http: HttpClient) { }
  getShops() {
    return this.http.get("http://localhost:3000/shops");
  }
  newShop(item) {
    return this.http.post("http://localhost:3000/insert", { "shop": item })
      .subscribe(data => { console.log(data) });
  }
  editShop(id) {
    return this.http.get("http://localhost:3000/edit/" + id);
  }
  updateShop(item) {
      return this.http.post("http://localhost:3000/update", { "shop": item })
      .subscribe(data => { console.log("updateservice" + data) });
  }
  deleteShop(id) {
    return this.http.get("http://localhost:3000/delete/" + id);
  }
  registerUser(user) {
    return this.http.post(this._registerUrl,user);
  }
  loginUser(user) {
    return this.http.post(this._loginUrl,user);
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
  // userUnlock(){

  // }
  // getLocation(){
  //   return this.http.post("http://localhost:3000/shops",login);
  // }
  getCategory(){
    // return this.http.post("http://localhost:3000/filtershops",login);
  }
  getFilterShop(login){
    return this.http.post("http://localhost:3000/filtershops",login);
  }

}

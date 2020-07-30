import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MyShopService {

  constructor(private http: HttpClient) { }
  getShops() {
    return this.http.get("http://localhost:3000/myshop/");
  }
  deleteShop(id) {
    return this.http.get("http://localhost:3000/delete/" + id);
  }
}

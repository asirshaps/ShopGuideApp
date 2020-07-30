import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
// selectedDay: string = '';
// selectChangeHandler (event:any) {
//   this.selectedDay = event.target.value;
// }
  constructor(public shopService: ShopService,private router: Router ) { }
  title:String = "Shop Guide";
  ngOnInit(): void {
  }
logoutUser(){
  localStorage.removeItem('token')
  this.router.navigate([''])
}
}

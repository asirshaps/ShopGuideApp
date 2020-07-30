import { Component } from '@angular/core';
import { ShopService } from './shop.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShopGuide';
  constructor(private shopService: ShopService){

  }
}

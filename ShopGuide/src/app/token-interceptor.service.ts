import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { ShopService } from './shop.service';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(req,nxt)
  {
    let shopService= this.injector.get(ShopService)
    let tokenizedReq = req.clone(
      {
        setHeader:{
          Authorization:`Bearer ${shopService.getToken()}`
        }
      }
    )
    return nxt.handle(tokenizedReq)
  }
}

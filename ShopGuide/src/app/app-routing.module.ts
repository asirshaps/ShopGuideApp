import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { from } from 'rxjs';
import { WelcomeComponent } from './welcome/welcome.component';
import { NewShopComponent } from './new-shop/new-shop.component';
import { EditShopComponent } from './edit-shop/edit-shop.component'
import { AuthGuard } from './auth.guard';
import { MyShopComponent } from './my-shop/my-shop.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'shops',
    component: ShopListComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: 'add',
    component: NewShopComponent
  },
  {
    path:'edit/:p_id',
    component:EditShopComponent
  },
  {
    path:'my-shops',
    component:MyShopComponent
  },
  {
    path:'userlogin',
    component:UserloginComponent
  },
  {
    path:'shoplist/:loc/:cat',
    component:ShopListComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

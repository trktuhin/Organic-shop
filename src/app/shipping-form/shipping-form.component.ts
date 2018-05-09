import { ShoppingCart } from './../models/shopping-cart';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../models/order';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {

  shipping={};
  userId:string;
  userSubscription:Subscription;
  @Input('cart') cart:ShoppingCart;
  constructor(
    private router:Router,
    private authService:AuthService,
    private orderService:OrderService) { }

  ngOnInit() {
    this.userSubscription=this.authService.user$.subscribe(user=>this.userId=user.uid);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
  async placeOrder(product){
    let order=new Order(this.cart,this.shipping,this.userId);
    let result=await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }

}

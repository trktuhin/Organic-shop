import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {

  orders$;
  userId:string;
  subscription:Subscription
  constructor(private orderService:OrderService,private authService:AuthService) { }

  ngOnInit() {
    this.subscription=this.authService.user$.subscribe(user=>this.userId=user.uid);
    this.orders$=this.orderService.getOrderByUser(this.userId);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

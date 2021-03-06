import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db:AngularFireDatabase,private shoppingCartService:ShoppingCartService) { }

  placeOrder(order){
    let result=this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getSingleOrder(orderId:string){
    return this.db.object('/orders/'+orderId);
  }
  
  getOrders(){
    return this.db.list('/orders');
  }



  getOrderByUser(userId:string){
    return this.db.list('/orders',{
      query:{
        orderByChild:'userId',
        equalTo:userId
      }
    });
  }

}

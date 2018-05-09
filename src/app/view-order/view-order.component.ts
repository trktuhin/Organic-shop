import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  order;
  constructor(private route:ActivatedRoute,private orderService:OrderService) { }

  ngOnInit() {
    let id=this.route.snapshot.paramMap.get('id');
    this.orderService.getSingleOrder(id).take(1).subscribe(order=>this.order=order);
  }
getTotalPrice(){
    let sum=0;
    for(let item of this.order.items){
      sum+=item.totalPrice;
    }
    return sum;
  }
}

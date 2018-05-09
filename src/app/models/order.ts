import { ShoppingCart } from './shopping-cart';
export class Order{
    datePlaced:number;
    items:any[];

    constructor(cart:ShoppingCart,public shipping:any,public userId:string){
        this.datePlaced=new Date().getTime();
        this.items=cart.items.map(i=>{
            return{
              product:{
                title:i.title,
                imageUrl:i.imageUrl,
                pricep:i.price
              },
              totalPrice:i.totalPrice,
              quantity:i.quantity
            }
          });
    }
}
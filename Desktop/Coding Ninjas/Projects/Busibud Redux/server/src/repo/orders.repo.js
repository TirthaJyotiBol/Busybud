import OrderModel from "../models/orders.model.js";
import mongoose from "mongoose";

export class OrdersRepositoy{
    
    // fetch all Orders : User Specific
    fetchAllOrders=async(userId)=>{   
        try{
          const orders = await OrderModel.find({ user_id:userId});
          return orders;
        }
        catch(err){
            return err;
        }
    }

    // place order for user
    placeOrder = async (userId,orders,totalPrice)=>{
        let order = {
            user_id: userId,
            products:orders,
            total_price:totalPrice
        };
        try{
            let newOrder = new OrderModel(order);
            let res = await newOrder.save();
            return res;
        }
        catch(e){
            return e;
        }
    }
}
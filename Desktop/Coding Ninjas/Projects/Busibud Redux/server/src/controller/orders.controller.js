import { OrdersRepositoy } from "../repo/orders.repo.js";

export class OrderController{
    constructor(){
        this.order_repo = new OrdersRepositoy();
    }
    placeOrder = async(req)=>{
        let userId = req.user_id;
        let orders = req.orders;
        let totalPrice = req.price;
        
        try{
           let response = await  this.order_repo.placeOrder(userId,orders,totalPrice);
           return {
            status:true,
            response,
            message:'Order Placed Successfully '
           }
        }
        catch(e){
            return {
                status:false,
                message:"Order Cannot be placed"
            }
        }
    }

    getAllOrders = async(req)=>{
        let user_id = req.headers['user-id']
        if(user_id){
            let response = this.order_repo.fetchAllOrders(user_id);
            return response;
        }
        return "User ID Not Found";
    }
}
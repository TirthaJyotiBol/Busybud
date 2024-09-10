import express from 'express';
import { OrderController } from '../controller/orders.controller.js';

let OrderRouter = express.Router();
let orderController = new OrderController();

OrderRouter.get('/',async (req,res)=>{
    let data = await orderController.getAllOrders(req);
    res.json(data);
});

OrderRouter.post('/',async (req,res)=>{
    console.log(req.body);
    let res_order = await orderController.placeOrder(req.body);
    res.json(res_order);
})

export default OrderRouter;
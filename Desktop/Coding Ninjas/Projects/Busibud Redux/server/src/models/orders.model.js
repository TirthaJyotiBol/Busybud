import mongoose from "mongoose";

let OrderSchema = mongoose.Schema({
    'user_id':{
        type:String,
        required:true
    },
    'products':[
        {
            _id: {
                type: 'String',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    'order_time':{
        type:Date,
        required:true,
        default:Date.now
    },
    'total_price':{
        type:Number,
        required:true
    }
});

let OrderModel = mongoose.model('Orders',OrderSchema);
export default OrderModel;
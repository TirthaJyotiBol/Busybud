import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    prod_id:{
        type:String,
        unique:true,
        require:true
    },
    name:{
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String,
        require:true,
        unique:true
    },
    price: {
        type: Number,
        required: true
      },
    description: {
        type: String,
        required: true
    }
});

let ProductModel  = mongoose.model('Product',ProductSchema);
export default ProductModel;
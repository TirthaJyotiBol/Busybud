import express from 'express';
import ProductsController from '../controller/products.controller.js';

let product_router = express.Router();
let product_controller = new ProductsController();

product_router.get('/',async (req,res)=>{
    let products = await product_controller.getAllProducts();
    res.json(products);
})

// insert some test data of products
product_router.get('/insert',(req,res)=>{
    let response = product_controller.runMigrationsInsertion();
    res.send(response);
})

export default product_router;
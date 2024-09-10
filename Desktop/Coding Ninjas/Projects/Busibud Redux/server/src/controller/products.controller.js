import ProductRepository from "../repo/product.repo.js";

export default class ProductsController{

    constructor(){
        this.prod_repo = new ProductRepository();
    }

    getAllProducts = async ()=>{
        let allProducts =  await this.prod_repo.getAllProducts();
        return allProducts;
    }

    // test function for insertion of demo data
    runMigrationsInsertion = async()=>{
        await this.prod_repo.insertProducts();
        return "Inserted";
    }

}
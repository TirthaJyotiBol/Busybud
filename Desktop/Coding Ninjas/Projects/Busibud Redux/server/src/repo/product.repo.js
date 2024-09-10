import ProductModel from "../models/products.models.js"

export default class ProductRepository{
  
    // fetch all the products for Home Page
    getAllProducts = async ()=>{
        let products  = await ProductModel.find({});
        return products;
    }

    // test insertion of Products
     insertProducts = async () => {
            const products = [
                {
                    prod_id: "P005",
                    name: "Keyboards",
                    image: "https://images.pexels.com/photos/1714205/pexels-photo-1714205.jpeg?auto=compress&cs=tinysrgb&w=600",
                    price: 699,
                    description: "This is the description for Keyboard.",
                    type:'electronics'
                },
                {
                    prod_id: "P006",
                    name: "Mobile",
                    image: "https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&w=600",
                    price: 24149,
                    description: "This is the description for Mobile phone.",
                    type:'electronics'
                },
                {
                    prod_id: "P007",
                    name: "Shoes",
                    image: "https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&w=600",
                    price: 799.99,
                    description: "This is the description for product Shoes.",
                    type:'shoes'
                }
            ];
    
            await ProductModel.insertMany(products);
        }

}
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { cartAction, cartselector } from '../redux/reducers/cart.reducer'
import { productSelector } from '../redux/reducers/products.reducer'
import { getProductsAsyncThunk } from '../redux/reducers/products.reducer'
import { useEffect } from 'react'
import { user_selector } from '../redux/reducers/user.reducer.js'
import { orderAction, orderAsyncThunk } from '../redux/reducers/orders.reducer.js'
import {useNavigate} from 'react-router-dom'

import cart_css from '../assets/css/cart.module.css';

export default function Cart() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(()=>{
    dispatch(getProductsAsyncThunk(''));
  },[dispatch])

  let cart = useSelector(cartselector).cartReducer;
  let products = useSelector(productSelector).productReducer;  
  let user = useSelector(user_selector).user_reducer;
  
  let [total,setTotal] = useState(0);

  let cartElementsUpdated = products.map((curr)=>{
    let newProd = {};
    if(cart.quantity_elements.includes(curr._id)){

      // get the quantity from here
      let cart_quality_index = cart.products.findIndex((curr_ele)=>{
        return curr_ele.element == curr._id; 
      });      
      if(cart_quality_index!=-1){
        let quantity = cart.products[cart_quality_index].quantity;
        newProd = {
          curr,
          quantity
        }
      }
      return newProd;
    }
  });

  const incrementCartProduct= (curr)=>{
    dispatch(cartAction.addToCart(curr.curr._id)); 

    let filteredAddedProducts = cartElementsUpdated.filter((curr)=>{
      return curr!=undefined;
    });
    dispatch(cartAction.setFiltetredCartProducts(filteredAddedProducts));
  }

  const decrementCartProduct=(curr)=>{
    dispatch(cartAction.decrementCartProduct(curr.curr._id));

    let filteredAddedProducts = cartElementsUpdated.filter((curr)=>{
      return curr!=undefined;
    });
    dispatch(cartAction.setFiltetredCartProducts(filteredAddedProducts));
  }

  // place order
  const placeOrder = async ()=>{
    let ordersInCart = cartElementsUpdated.filter((curr)=>curr!=undefined);
    
    let user_id = user.user_id;
    if(!user_id){
      alert('Order Cannot be placed, Please Login!!!');
      return;
    }
    // get all the product ids 
    const orders = ordersInCart.map(item => ({
      _id: item.curr._id,
      quantity: item.quantity
    }));   
    user_id = user_id.replace(/"/g, '');
    
    let OrderObject = {
      user_id,
      'orders':orders,
      'price':total
    }
    let place_result = await dispatch(orderAsyncThunk({OrderObject}));
    
    // order placed successfully
    if(orderAsyncThunk.fulfilled.match(place_result)){
      dispatch(cartAction.emptyCart());
      navigate('/orders');
    }

  }

  setTimeout(()=>{
    let x = 0;
    cartElementsUpdated.forEach((curr)=>{
      if(curr!=undefined){
        x+=Number(curr.curr.price*curr.quantity);
      }
    });
    x = parseFloat(x.toFixed(2));
    setTotal(x);
  },100)

  return (
    <>
    <span>Total Price: {total} </span>
    <br/>
    {
      cart.quantity_elements.length>0?
      <button onClick={()=>{placeOrder()}} className={cart_css.place_order}>Place Order</button>:''
    }

    <div className={cart_css.cart_page}>
      {
        cartElementsUpdated.map((curr)=>{
          if(curr!=undefined){
            return(
              <div className={cart_css.cart_box_div}>
                <img src={curr.curr.image} />
                <p>{curr.curr.name}</p>
                {/* Price and Quantity */}
                  <span>₹{curr.curr.price}</span>
                <div className={cart_css.flex}>
                  <i onClick={()=>{incrementCartProduct(curr)}} class="fa-solid fa-plus" id={cart_css.increment_button}></i>
                  <span className={cart_css.quantity}>{curr.quantity}</span>
                  <i onClick={()=>{decrementCartProduct(curr)}} class="fa-solid fa-minus" id={cart_css.decrement_button}></i>
                </div>
              </div>
            )
          }
        })
      }
    </div>
    </>
  )
}

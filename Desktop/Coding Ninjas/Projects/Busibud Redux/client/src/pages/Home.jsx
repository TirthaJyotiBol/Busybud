import React, { useEffect } from 'react'
import { getProductsAsyncThunk } from '../redux/reducers/products.reducer.js'
import { useSelector } from 'react-redux';
import { productSelector } from '../redux/reducers/products.reducer.js';
import { useDispatch } from 'react-redux';
import home_css from '../assets/css/home.module.css'
import Filters from '../components/Filters.jsx';
import { cartAction, cartselector } from '../redux/reducers/cart.reducer.js';
import { user_selector } from '../redux/reducers/user.reducer.js';

export default function Home() {
  let cart = useSelector(cartselector).cartReducer;
  let quality_elements = cart.quantity_elements;
  let logged_in_user_id = useSelector(user_selector).user_reducer.user_id;
  
  let dispatch = useDispatch();
  let products = useSelector(productSelector).productReducer;
  
  useEffect(()=>{
    dispatch(getProductsAsyncThunk(''));
  },[dispatch])

  const addToCart = (id)=>{
    if(!logged_in_user_id){
      alert("Please Log in to Add items to cart");
      return;
    }
    dispatch(cartAction.addToCart(id));
  }

  const showDescription = (event,description)=>{
    event.target.title=description;
  }

  const removeFromCart = (id)=>{
    if(!logged_in_user_id){
      alert("Please Log in to access cart");
      return;
    }
    dispatch(cartAction.removeFromCart(id));
  }

  return (
    <div className={home_css.home_page}>
      
      {/* Filters */}
      <div id={home_css.filters}>
        <Filters/>
      </div>
      {/* Fetch products for display */}
      <div id={home_css.home_element}>
        {
          products.length==0?
          <div className={home_css.noProducts}>
            No Products
          </div>:
          products.map((curr,index)=>{
            return(
              <>
              <div key={index} className={home_css.product_box}>
                <img className={home_css.image} src={curr.image} />  
                <h1>₹{curr.price}</h1>
                <p>{curr.name}</p>
                {
                  !quality_elements.includes(curr._id)?
                  <button onClick={(e)=>{addToCart(curr._id)}} className={home_css.add_to_cart}>ADD TO CART</button>
                  :
                  <button onClick={(e)=>{removeFromCart(curr._id)}} className={home_css.remove_from_cart}>REMOVE FROM CART</button>
                }
              </div>
            </>
            )
          })
        }
      </div>
    </div>
  )
}

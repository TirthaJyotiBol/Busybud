import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { user_selector } from '../redux/reducers/user.reducer.js';
import { productSelector } from '../redux/reducers/products.reducer.js';
import { getProductsAsyncThunk } from '../redux/reducers/products.reducer.js';
import { orderSelector } from '../redux/reducers/orders.reducer.js';
import { fetchOrdersAsyncThunk } from '../redux/reducers/orders.reducer.js';
import order_css from '../assets/css/order.module.css';

export default function Orders() {
  let dispatch = useDispatch();
  let userData = useSelector(user_selector).user_reducer;
  let products = useSelector(productSelector).productReducer;
  let orders = useSelector(orderSelector).orderReducer.orders;
  const [sortType,setSortType] = useState('asc');

  let user_id = userData.user_id;

  useEffect(()=>{
    // set orders in state
    dispatch(fetchOrdersAsyncThunk({user_id,'sort':sortType}));
    dispatch(getProductsAsyncThunk(''));
  },[])

  // Function to find product details based on product IDs
const getOrderDetails = (order) => {
  const detailedProducts = order.products.map(orderProduct => {
    const productDetails = products.find(product => product._id === orderProduct._id);
    if (productDetails) {
      return {
        ...productDetails, 
        quantity: orderProduct.quantity 
      };
    } else {
      return orderProduct; 
    }
  });
  
  return {
    order_id: order._id,
    products: detailedProducts, 
    total_price: order.total_price,
    order_time: order.order_time
  };

};


// First, format the orders with product details
const formattedOrders = orders.map(order => getOrderDetails(order));

const sortOrders = ()=>{
  dispatch(fetchOrdersAsyncThunk({user_id,sort:sortType}));
  setSortType(sortType=='asc'?'desc':'asc');
}

  return (
    <>
        {
          formattedOrders.length>0?
          <>
           <h1>Orders</h1> <button className={order_css.sortingButton} onClick={sortOrders}>SORT</button>
    <div className={order_css.order_page}>
      <div>
      <table border="1" cellPadding="10" cellSpacing="0"  className={order_css.table}>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Product</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Ordered On</th>
          </tr>
        </thead>
        <tbody>
          {formattedOrders && formattedOrders.map((currOrder) => (
            currOrder.products && currOrder.products.map((currOrderProduct, index) => (
              <tr key={`${currOrder.order_id}-${index}`}>
                <td>{currOrder.order_id ? currOrder.order_id : "NA"}</td>
                <td>{currOrderProduct && currOrderProduct.name ? currOrderProduct.name : "NA"}</td>
                <td><img src={currOrderProduct?.image} alt={currOrderProduct?.name} /></td>
                <td>Rs. {currOrderProduct && currOrderProduct.price ? currOrderProduct.price : "0.00"}</td>
                <td>{currOrderProduct.quantity ?currOrderProduct.quantity:'NA' }</td>
                <td>{currOrderProduct.quantity && currOrderProduct.price? currOrderProduct.price*currOrderProduct.quantity:'NA' }</td>
                <td>{ new Date(currOrder.order_time).toISOString().split('T')[0]}</td>
              </tr>
            ))
          ))}
        </tbody>

      </table>
      </div>
    </div>
          </>:
          <div className={order_css.no_order}>No Orders</div>
        }
    </>
  )
}

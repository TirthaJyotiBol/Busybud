import React from 'react';
import { Link } from 'react-router-dom';
import navbar_css from '../assets/css/navbar.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import navImages from '../assets/Images/navbar_images';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { user_selector } from '../redux/reducers/user.reducer';
import { useDispatch } from 'react-redux';
import { user_action } from '../redux/reducers/user.reducer';
import { cartselector } from '../redux/reducers/cart.reducer';

export default function Navbar() {
    let dispatch = useDispatch();
    let {name,email} = useSelector(user_selector).user_reducer;
    let cart_data = useSelector(cartselector).cartReducer;

    // log out user once clicked
    const logoutUser = ()=>{
       dispatch(user_action.logOutUser()); 
    }  

  return (
        <>
            <div id={navbar_css.navbar}>
            <div id={navbar_css.navbar_lhs}>
                <Link to='/'>Busi Buy</Link>
            </div>
            <div id={navbar_css.navbar_rhs}>
                <ul className={navbar_css.link_elements_navbar}>
                    {
                        // if user is logged in then only show the remaining List
                        name.length>0?
                        <>
                            <li><Link to='/'><img className="icon_styles" src={navImages.home_nav} alt="Home"/><span className={navbar_css.cart_item}>Home</span></Link></li>
                            <li><Link to='/orders'><img src={navImages.orders_nav} /> <span className={navbar_css.cart_item}>My Orders</span></Link></li>
                            <li><Link to='/cart'><img src={navImages.cart_nav} /> <span className={navbar_css.cart_item}>Cart</span> <span className={cart_data.quantity_elements.length>0?navbar_css.cart_count_navbar:''}>{cart_data.quantity_elements.length>0?cart_data.quantity_elements.length:''}</span> </Link></li>
                            <li onClick={logoutUser}> <span className={navbar_css.logout_nav}>Logout</span></li>
                        </>
                        :
                        <>
                         <li><Link to='/login'><span className={navbar_css.login_nav}>Login</span></Link></li>
                        </>
                    }
                    
                </ul>
            </div>
            </div>

            <div className={navbar_css.outlets}>
                <Outlet/>
            </div>
        </>
  );
}

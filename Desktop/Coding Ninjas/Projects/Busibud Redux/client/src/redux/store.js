import {configureStore } from "@reduxjs/toolkit";
import { user_reducer } from "./reducers/user.reducer";
import { productReducer } from "./reducers/products.reducer";
import { cartReducer } from "./reducers/cart.reducer";
import { orderReducer } from "./reducers/orders.reducer";

let store  = configureStore({
    reducer:{
        user_reducer,
        productReducer,
        cartReducer,
        orderReducer}
});

export default store;
import { createSlice } from "@reduxjs/toolkit";

let INITIAL_STATE = {
    products:[],
    quantity_elements:[],
    total_price:0,
    filtered_cart_products:[]
};

let cartSlice = createSlice({
    name:'cart',
    initialState:INITIAL_STATE,
    reducers:{
        addToCart: (state, action) => {
            let element = action.payload;
            let newCartItem = {'element':element,'quantity':1};
            
            let check_element = state.products.findIndex((curr) =>curr.element === element);
            
            if (check_element === -1) {
                state.products.push(newCartItem);
                state.quantity_elements.push(element);
            } 
            else {
                state.products[check_element].quantity += 1;
            }
        },
        removeFromCart:(state,action)=>{
            let cartIndex = state.quantity_elements.findIndex((curr)=>{
                return curr == action.payload;
            });
            if(cartIndex!=-1){
                state.quantity_elements.splice(cartIndex,1);
            }

            cartIndex = state.products.findIndex((curr)=>{
                return curr.element == action.payload;
            });
            if(cartIndex!=-1){
                state.products.splice(cartIndex,1);
            }
        },
        decrementCartProduct:(state,action)=>{
            let element = action.payload; // getting product id
            
            let check_element = state.products.findIndex((curr) =>curr.element === element);
            
            if (check_element === -1) {
                // if product not found Do Nothing
            } 
            else {
                if( state.products[check_element].quantity-1>0){
                    state.products[check_element].quantity -= 1;
                }
                else{
                    state.products[check_element].quantity = 0;
                    state.products.splice(check_element,1);

                    // find index in quantity_elements and remove that element
                    let quantityIndex = state.quantity_elements.findIndex((curr)=>{
                        return curr == element;
                    });

                    if(quantityIndex!=-1){
                        state.quantity_elements.splice(quantityIndex,1);
                    }
                }
            }
        },
        setFiltetredCartProducts:(state,action)=>{
            state.filtered_cart_products = action.payload;
            let total = 0;
            action.payload.forEach((curr)=>{
                total+=((curr.curr.price)*curr.quantity);
            });
            state.total_price = total;
        },
        // empty cart once order is placed
        emptyCart:(state,action)=>{
            state.filtered_cart_products = [];
            state.total_price = 0;
            state.products = [];
            state.quantity_elements = [];
        }
    },
});


export const cartReducer = cartSlice.reducer;
export const cartAction = cartSlice.actions;
export const cartselector = (state)=>state;
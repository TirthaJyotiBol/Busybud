import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let INITIAL_STATE={
    orders:[]
};
let url = `${process.env.REACT_APP_URL}/orders`;

export let orderAsyncThunk = createAsyncThunk(
    'orders/placeOrder',
    async ({OrderObject},thunkAPI)=>{
        try{
            let response = await  axios.post(url,OrderObject);
            return response;
        }
        catch(e){
            return "Error: Order cannot be placed";
        }

    }
)

export const fetchOrdersAsyncThunk = createAsyncThunk(
    'orders/fetchOrders',
    async ({user_id,sort}, { rejectWithValue }) => {
      try {
        const response = await axios.get(url, {
          headers: {
            'user-id': user_id
          }
        });
        if(sort=="asc"){
            const sortedOrders = response.data.sort((a, b) => {
                return  new Date(b.order_time)-new Date(a.order_time);
              });
              return sortedOrders;
        }
        else{
            const sortedOrders = response.data.sort((a, b) => {
                return  new Date(a.order_time)-new Date(b.order_time);
              });
              return sortedOrders;
        }
      }
    catch (error) {
        return rejectWithValue('No Orders');
      }
    });

let orderSlice = createSlice({
    name:'orders',
    initialState:INITIAL_STATE,
    reducers:{
        fetchOrders:{

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(orderAsyncThunk.fulfilled(),(state,action)=>{
            alert('Order Placed Successfully');
        })
        .addCase(orderAsyncThunk.rejected(),(state,action)=>{
            alert('Order Cannot be placed')
        })
        .addCase(fetchOrdersAsyncThunk.fulfilled, (state, action) => {
            state.orders = action.payload;
          })
    }
});

export const orderReducer = orderSlice.reducer;
export const orderAction = orderSlice.actions;
export const orderSelector = (state)=>state;
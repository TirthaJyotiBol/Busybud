import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let INITIAL_STATE = [];

export const getProductsAsyncThunk = createAsyncThunk(
    'products/setAllProducts',
    async ({searchFilter,rangeFilter,typeFilter},thunkApi)=>{
        try{
            let url = `${process.env.REACT_APP_URL}/products`;
            let response = await axios.get(url);

            // search for filtration
            if((searchFilter && searchFilter.length>3) || rangeFilter || typeFilter){
                let filteredResponse = response.data.filter((curr) => {
                    return curr.name.toLowerCase().includes(searchFilter.toLowerCase());
                });

                if(typeFilter && typeFilter.length>0){
                    filteredResponse = filteredResponse.filter(product => typeFilter.includes(product.type));
                }
                
                if(rangeFilter){
                    filteredResponse = filteredResponse.filter(currProduct=>currProduct.price<=rangeFilter)
                }
                return filteredResponse;
            }
            return await response.data;
        }
        catch(e){
            return thunkApi.rejectWithValue('Error');
        }
    }
)

let productSlice = createSlice({
    name:'products',
    initialState:INITIAL_STATE,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getProductsAsyncThunk.fulfilled,(state,action)=>{
            return action.payload;
        })
        .addCase(getProductsAsyncThunk.rejected,(state,action)=>{

        })
    }
});

export let productReducer = productSlice.reducer;
export let productAction = productSlice.actions;
export let productSelector = (state)=>state;
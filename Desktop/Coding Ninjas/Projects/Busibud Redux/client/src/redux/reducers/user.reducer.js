import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

// let INITIAL_STATE = {name:'Tirtha',email:'"tirthabol222@gmail.com"',user_id:'66d60a27a96a81a972b93107',role:'user'};
let INITIAL_STATE = {
    'name':'',
    'email':'',
    'user_id':'',
    'role':''
}


export const getLoginAsyncThunk = createAsyncThunk(
    'user/loginUser',
    async ({ email, password },thunkAPI)=>{ 
        let url_login_user = `${process.env.REACT_APP_URL}/users/login`;
        
        try{
            let response = await axios.post(url_login_user,{email,password});
            return await response.data;
        }
        catch(err){
            return {data:null,response:'ok',message:'User Found'};
        }
    }
);

export const getRegisterThunk = createAsyncThunk(
    'user/registerUser',
    async({userDetails},thunkAPI)=>{
        try{
            let register_url = `${process.env.REACT_APP_URL}/users/register`;
            let response = await axios.post(register_url,{userDetails});
            return {
                'status':true,
                'response':await response.data
            };
        }
        catch(err){
            return {
                'status':false,
                'message':"User Cannot be logged in"
            }
        }   
    }
)


let UserSlicer = createSlice({
    name:'user',
    initialState:INITIAL_STATE,
    reducers:{
        logOutUser:(state,action)=>{
            state.email = '';
            state.name = '';
            state.user_id = '';
            state.role = '';
            localStorage.clear();
        },
        loginUser:(state,action)=>{
         
        },
        registerUser:(state,action)=>{
         
        },
        loginFromLocalStorage:(state,action)=>{
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.user_id = action.payload.user_id;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getLoginAsyncThunk.fulfilled,(state,action)=>{
            if(action.payload.response=='error'){
                state.email = '';
                state.name = '';
                state.user_id = '';
            }
            else{
                localStorage.clear();
                state.email = action.payload.data.email;
                state.name = action.payload.data.name;                
                state.user_id = action.payload.data._id;
                let userDetails = {
                    'email':action.payload.data.email,
                    'name':action.payload.data.name,
                    'user_id':action.payload.data._id
                }
                localStorage.setItem('user',JSON.stringify(userDetails));
            }            
        })
        .addCase(getRegisterThunk.fulfilled,(state,action)=>{
            if(action.payload.response.message=="User already there please use a different email "){
                alert('User already there please use a different email ');
                return;
            }
            state.email = action.payload.response.userData.email;
            state.name = action.payload.response.userData.name;
            state.user_id = action.payload.response.userData._id;                
            state.role = action.payload.response.userData.role;

            let userDetails = {
                'email':action.payload.response.userData.email,
                'name':action.payload.response.userData.name,
                'user_id':action.payload.response.userData._id
            }
            
            // store user userdata in localstorage
            localStorage.clear();
            localStorage.setItem('user',JSON.stringify(userDetails));

            alert('User Registered Successfully');
        })
    }
});

export let user_action = UserSlicer.actions;
export let user_reducer = UserSlicer.reducer;
export let user_selector = (state)=>state;


import React, { useState } from 'react'
import login_css from '../assets/css/login.module.css';
import { useDispatch } from 'react-redux';
import { getLoginAsyncThunk } from '../redux/reducers/user.reducer';
import { useSelector } from 'react-redux';
import { user_selector } from '../redux/reducers/user.reducer';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  let selector = useSelector(user_selector);
  let navigate = useNavigate();
    

  let [password,setPassword] = useState('');
  let [email,setEmail] = useState('');
  let dispatch = useDispatch();

  let loginForm = ()=>{
    if(!email || !password){
      alert('Please Enter Username and Password ');
      return;
    }
    dispatch(getLoginAsyncThunk({email,password}));
    navigate('/');
  }

  let registerUser = ()=>{
    navigate('/register');
  }

  return (
    <div className={login_css.login_form}>
      <h2>Login</h2>
      <div>
        <input onInput={(e)=>{setEmail(e.target.value)}} value={email} className={login_css.login_input} type='email' name='email_input' placeholder='Enter Email'/> <br/>
        <input onInput={(e)=>{setPassword(e.target.value)}} value={password} className={login_css.login_input} type='password' name='password_input' placeholder='Enter Password'/> 
        
        <br/>
        <button onClick={loginForm} className={login_css.login_button}>Login</button>
        <p>or</p>
        <button onClick={registerUser} className={login_css.register_button}>Register</button>
      </div>
    </div>
  )
}

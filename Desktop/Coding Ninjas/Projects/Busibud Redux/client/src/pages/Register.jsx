import React, { useEffect } from 'react'
import login_css from '../assets/css/login.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getRegisterThunk } from '../redux/reducers/user.reducer';
import { useSelector } from 'react-redux';
import { user_selector } from '../redux/reducers/user.reducer';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  let [password,setPassword] = useState('');
  let [email,setEmail] = useState('');
  let [name,setName] = useState('');
  let dispatch = useDispatch();
  const user = useSelector(user_selector).user_reducer;
  let navigate = useNavigate();

  // side effects for redirection to home page after user logged in
  useEffect(()=>{
    if(user.email){
      navigate('/');
    }
  },[user])

  let registerUser = ()=>{
    let role = document.getElementById('role').value;

    if(!role || !name || !email || !password){
      alert('Please Enter all the details to register');
      return;
    }

    let userDetails = {name,role,email,password};
    dispatch(getRegisterThunk({userDetails}));

    
  }

  return (
    <div>
       <div className={login_css.login_form}>
          <h2>Register</h2>
          <div>
            <input onInput={(e)=>{setName(e.target.value)}} value={name} className={login_css.login_input} type='text' name='email_name' placeholder='Enter Name'/> <br/>
            <input onInput={(e)=>{setEmail(e.target.value)}} value={email} className={login_css.login_input} type='email' name='email_input' placeholder='Enter Email'/> <br/>
            <input onInput={(e)=>{setPassword(e.target.value)}} value={password} className={login_css.login_input} type='password' name='password_input' placeholder='Enter Password'/> <br/>
            <select className={login_css.login_input} id='role'>
                <option value='admin'>Admin</option>
                <option value='user'>User</option>
            </select>
            <br/>
            <br/>
            <button onClick={registerUser} className={login_css.register_button}>Register</button>
          </div>
        </div>
    </div>
  )
}

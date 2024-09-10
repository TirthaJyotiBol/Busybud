import React from 'react'
import { useSelector } from 'react-redux'
import { user_selector } from '../redux/reducers/user.reducer'
import { Navigate } from 'react-router-dom';

export default function ProtectedToute({element}) {
    let logged_in_user_id = useSelector(user_selector).user_reducer.user_id;
    
    return logged_in_user_id?element:<Navigate to='/login'/>
}

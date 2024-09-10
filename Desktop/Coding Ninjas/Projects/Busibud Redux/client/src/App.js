import './App.css';
import Navbar from './components/Navbar';
import {createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import store from './redux/store';
import { Provider } from 'react-redux';
import ProtectedToute from './components/ProtectedToute';
import { useEffect } from 'react';
import { user_selector } from './redux/reducers/user.reducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { user_action } from './redux/reducers/user.reducer';


const router = createBrowserRouter([
  {path:'/',element:<Navbar/>,
    children:[
      {index:true,element:<Home/>},
      {path:'/login',element:<Login/>},
      {path:'/register',element:<Register/>},
      {path:'/cart',element:<ProtectedToute element={<Cart/>}/>},
      {path:'/orders',element:<ProtectedToute element={<Orders/>} />},
    ]
  }
])

function App() {
  return (
        <Provider store={store}>
           <StateApp/>
        </Provider>
  );
}


function StateApp(){
  let dispatch = useDispatch();

  useEffect(()=>{
    let checkLoginUser = localStorage.getItem('user');
    if(checkLoginUser){
      checkLoginUser = JSON.parse(checkLoginUser);
      let {name,email,user_id} = checkLoginUser;
      dispatch(user_action.loginFromLocalStorage({name,email,user_id}));
    }
  })
  let user = useSelector(user_selector).user_reducer;
  return (
    <div className="App">
        <RouterProvider router={router}/>
      </div>
  )
}

export default App;

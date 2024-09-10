import React, { useEffect, useState } from 'react'
import home_css from '../assets/css/home.module.css'
import { useDispatch } from 'react-redux';
import { getProductsAsyncThunk } from '../redux/reducers/products.reducer.js';

export default function Filters() {
    let dispatch = useDispatch();
    let [rangeFilter, setRangeFilter] = useState(10000);
    let [typeFilter,setTypeFilter] = useState([]);
    let [searchFilter,setSearchFilter] = useState('');

    let handleSearch = (search)=>{
        search = search.trim();
        setSearchFilter(search);
      //  dispatch(getProductsAsyncThunk({search}));
    }

    let handleTypeFilter= ()=>{
      let typesSelected = document.getElementsByClassName('types');
      let selectedTypesArray = Array.from(typesSelected).filter(type => type.checked).map(type => type.value); 
      setTypeFilter(selectedTypesArray);
    }

    useEffect(()=>{
      dispatch(getProductsAsyncThunk({searchFilter,rangeFilter,typeFilter}));
    },[rangeFilter,typeFilter,searchFilter])

  return (
    <div>
        <input onInput={(e)=>{handleSearch(e.target.value)}} placeholder='Search By Name' className={home_css.search_bar_filter}/>

        <h2>Filter By Type</h2>
        <div className={home_css.filter_checkboxes}>
            <label for='clothes'><input className='types' onChange={handleTypeFilter} id='clothes' value='clothes' type="checkbox" name="type_filter[]" /> Clothes</label><br/>
            <label for='electronics'><input className='types' id='electronics' onChange={handleTypeFilter}  value='electronics' type="checkbox" name="type_filter[]" /> Electronics</label><br/>
            <label for='shoes'><input id='shoes' value='shoes'  className='types' onChange={handleTypeFilter} type="checkbox" name="type_filter[]" /> Shoes</label><br/>
            <label for='accessories'><input id='accessories' className='types' onChange={handleTypeFilter} value='accessories' type="checkbox" name="type_filter[]" /> Accessories</label><br/>
        </div>

        <h2>Select Price Range: </h2> Rs.{rangeFilter}
        <br/>
        <input onChange={(e)=>{setRangeFilter(e.target.value)}} type="range" id={home_css.price_range_filter} name="points" min="0" max="100000"></input>
   
    </div>
  )
}

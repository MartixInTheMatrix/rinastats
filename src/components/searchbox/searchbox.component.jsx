import React from "react";
import './searchbox.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [cname, setCname] = useState('')

  let navigate = useNavigate();
  const onSearchChange = (event) =>{
    const searchFieldString = event.target.value;
    if(searchFieldString.length === 0){
        setCname('')
    }else{
        setCname('valued')
    }
};


  return (
    <div className={`search`}>
        <div className="box">
        <i id="searchIcon" className={"fas fa-search " + cname}></i>
        <form onSubmit={(event) => {
            event.preventDefault();
            console.log(event)
          navigate(`/player/${event.target.lastChild.value}`);
          event.target.lastChild.value = ''
          setCname('')
        }}>
        <input
            className={`search-box`}
            type='search'
            onChange={onSearchChange}
            id="searchBoxContent"
        />
        </form>
        </div>

    </div>
    );
};

export default SearchBox;

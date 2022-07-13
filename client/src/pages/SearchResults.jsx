import React from 'react'
import '../styles/SearchResults.css';

function SearchResults() {
  return (
    <div className="searchContainer">
         <div className="search">
        <input
          value=""
          type="text"
          className="searchField"
          placeholder="What do you need to borrow?"
        ></input>
        <button type="submit" className="searchButton">
          <i className="fa fa-search fa-xl"></i>
        </button>
      </div>
    </div>
  )
}

export default SearchResults
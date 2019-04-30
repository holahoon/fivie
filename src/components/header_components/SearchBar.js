import React from "react";
import "../../App.css";

const SearchBar = props => {
  return (
    <div className="search-bar-container">
      <form onSubmit={props.submit} className="form">
        <input
          type="text"
          placeholder="Type your topic"
          onChange={props.handleChange}
          name="searchedMovie"
          value={props.searchedMovie}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

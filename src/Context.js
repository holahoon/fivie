import React, { Component } from "react";
import axios from "axios";

// Create Context
const Context = React.createContext();

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES":
      return {
        ...state,
        movie_list: action.payload,
        title: "Related"
      };
    case "POPULAR_MOVIES":
      return {
        ...state,
        movie_list: action.payload,
        title: "Popular"
      };
    case "TOP_RATED_MOVIES":
      return {
        ...state,
        movie_list: action.payload,
        title: "Top rated"
      };
    case "NOW_PLAYING_MOVIES":
      return {
        ...state,
        movie_list: action.payload,
        title: "Now playing"
      };
    case "UPCOMING_MOVIES":
      return {
        ...state,
        movie_list: action.payload,
        title: "Upcoming"
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  // State
  constructor() {
    super();
    this.state = {
      movie_list: [],
      title: "Now playing",
      dispatch: action => this.setState(state => reducer(state, action))
    };
  }

  // Load the Now playing movies api
  componentDidMount() {
    const now_playing_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&language=en-US&page=1`;

    axios
      .get(now_playing_url)
      .then(response => {
        // Empty array to push in 5 data results
        let arrayFive = [];
        for (let i = 0; i < 5; i++) {
          arrayFive.push(response.data.results[i]);
        }
        // Set state with those 5 data results in the array
        this.setState({
          movie_list: arrayFive
        });
      })
      .catch(error => console.log("Error: ", error));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

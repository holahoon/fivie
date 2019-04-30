import React, { Component } from "react";
import axios from "axios";
import "../Header.css";

import { Consumer } from "../Context";
import Trending from "./header_components/Trending";
import SearchBar from "./header_components/SearchBar";

import backgroundImage1 from "../img/bg1.png";
import backgroundImage2 from "../img/bg2.png";
import backgroundImage3 from "../img/bg3.png";
import backgroundImage4 from "../img/bg4.png";

class Header extends Component {
  state = {
    searchedMovie: "",
    backgroundImageTitle: ["Dunkirk", "Armageddon", "Wanted 2", "Intersteller"],
    displayingTitle: "Dunkirk",
    backgroundImage: [
      backgroundImage1,
      backgroundImage2,
      backgroundImage3,
      backgroundImage4
    ],
    displayingImage: backgroundImage1,
    counter: 0
  };

  // To set timer to change background iamge:
  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.counter < 3) {
        this.setState({
          counter: this.state.counter + 1
        });
      } else {
        this.setState({
          counter: 0
        });
      }
      this.setState({
        displayingImage: this.state.backgroundImage[this.state.counter],
        displayingTitle: this.state.backgroundImageTitle[this.state.counter]
      });
    }, 15000);
  }

  // When something's typed in input field
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Get search
  search = (dispatch, event) => {
    event.preventDefault();

    let emptyArray = [];
    const search_url = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&query=${this.state.searchedMovie}&page=1
    `;

    // Fetch search movie data
    axios.get(search_url).then(response => {
      for (let i = 0; i < 5; i++) {
        emptyArray.push(response.data.results[i]);
        // this.backgrounds.push(response.data.results[i]);
      }
      dispatch({
        type: "SEARCH_MOVIES",
        payload: emptyArray
      });
    });
  };

  // Get Now playing
  getNowPlaying = (dispatch, event) => {
    event.preventDefault();

    let emptyArray = [];
    const nowPlaying_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&language=en-US&page=1
    `;

    axios.get(nowPlaying_url).then(response => {
      for (let i = 0; i < 5; i++) {
        emptyArray.push(response.data.results[i]);
      }
      dispatch({
        type: "NOW_PLAYING_MOVIES",
        payload: emptyArray
      });
    });
  };
  // Get Popular
  getPopular = (dispatch, event) => {
    event.preventDefault();

    let emptyArray = [];
    const nowPlaying_url = `https://api.themoviedb.org/3/movie/popular?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&language=en-US&page=1
    `;

    axios.get(nowPlaying_url).then(response => {
      for (let i = 0; i < 5; i++) {
        emptyArray.push(response.data.results[i]);
      }
      dispatch({
        type: "POPULAR_MOVIES",
        payload: emptyArray
      });
    });
  };
  // Get Top rated
  getTopRated = (dispatch, event) => {
    event.preventDefault();

    let emptyArray = [];
    const topRated_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&language=en-US&page=1
    `;

    axios.get(topRated_url).then(response => {
      for (let i = 0; i < 5; i++) {
        emptyArray.push(response.data.results[i]);
      }
      dispatch({
        type: "TOP_RATED_MOVIES",
        payload: emptyArray
      });
    });
  };
  // Get Upcoming
  getUpcoming = (dispatch, event) => {
    event.preventDefault();

    let emptyArray = [];
    const upcoming_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&language=en-US&page=1
    `;

    axios.get(upcoming_url).then(response => {
      for (let i = 0; i < 5; i++) {
        emptyArray.push(response.data.results[i]);
      }
      dispatch({
        type: "UPCOMING_MOVIES",
        payload: emptyArray
      });
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <section>
              <header
                style={{
                  backgroundImage: `linear-gradient(
                    rgba(232, 114, 83, 0.4),
                    rgba(255, 136, 172, 0.4)
                  ), url(${this.state.displayingImage})`
                }}
                className="header-background"
              >
                <Trending />
                <SearchBar
                  submit={this.search.bind(this, dispatch)}
                  handleChange={this.handleChange}
                  searchedMovie={this.state.searchedMovie}
                />
                <div className="search-option">
                  <ul>
                    <li onClick={this.getNowPlaying.bind(this, dispatch)}>
                      Now playing
                    </li>
                    <li>|</li>
                    <li onClick={this.getPopular.bind(this, dispatch)}>
                      Popular
                    </li>
                    <li>|</li>
                    <li onClick={this.getTopRated.bind(this, dispatch)}>
                      Top rated
                    </li>
                    <li>|</li>
                    <li onClick={this.getUpcoming.bind(this, dispatch)}>
                      Upcoming
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="paragraph-1">
                    This is Fivie.
                    <br />A new kind of movie site.
                  </p>
                </div>
                <div className="background-image-name">
                  {this.state.displayingTitle}
                </div>
              </header>
              <p className="paragraph-2">
                Featuring <span>Top 5</span> Movies <br />
                According to <span>Your Search</span>
              </p>
              <div className="black-bar" />
              <div />
            </section>
          );
        }}
      </Consumer>
    );
  }
}

export default Header;

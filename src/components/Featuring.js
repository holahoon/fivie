import React, { Component } from "react";
import { Consumer } from "../Context";
import axios from "axios";
import { Transition, animated } from "react-spring/renderprops";
import "../featuring.css";

import MovieLists from "./featuring_components/MovieLists";
import MovieInfo from "./MovieInfo";

class Featuring extends Component {
  // State
  state = {
    movie_info: {},
    review: {},
    trailer: ""
  };

  // Get details of the specified movie with id
  showMovieInfo = id => {
    // Fetch movie info api
    const details_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&language=en-US`;

    axios.get(details_url).then(response => {
      this.setState({ movie_info: response.data });
      console.log(this.state.movie_info);
    });

    // Fetch review api
    const review_url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&language=en-US&page=1
    `;

    axios.get(review_url).then(response => {
      this.setState({ review: response.data });
    });

    // Fetch movie video
    const movie_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&language=en-US
    `;

    axios
      .get(movie_url)
      .then(response => {
        const { results } = response.data;
        let newArray = [];
        for (let key in results) {
          if (results.hasOwnProperty(key)) {
            newArray.push(results[key]);
          }
        }
        newArray.map((item, index) => {
          if (index === 0) {
            this.setState({ trailer: item.key });
          }
          return;
        });
      })
      .catch(error => console.log("Movie trailer error: ", error));
    this.setState({ showMovie: true });
  };

  render() {
    return (
      <React.Fragment>
        <Consumer>
          {value => {
            const { movie_list, title } = value;
            return (
              <section>
                <div className="featuring-movie-container">
                  <Transition
                    items={title}
                    from={{
                      transform: "translateX(50px)",
                      opacity: 0,
                      display: "block"
                    }}
                    enter={{
                      transform: "translateX(0px)",
                      opacity: 1,
                      delay: 300
                    }}
                    leave={{
                      transform: "translateX(-50px)",
                      opacity: 0,
                      display: "none"
                    }}
                  >
                    {title =>
                      title &&
                      (props => (
                        <div className="now-playing" style={props}>
                          "{title}"
                        </div>
                      ))
                    }
                  </Transition>
                  {/*<div className="now-playing">"{title}"</div>*/}
                  <div className="movie-list-container">
                    {movie_list.map(movie => (
                      <MovieLists
                        key={movie.id}
                        movieList={movie}
                        showMovieInfo={this.showMovieInfo}
                      />
                    ))}
                  </div>
                </div>
                <Transition
                  native
                  items={this.state.showMovie}
                  config={{ duration: 2000 }}
                  from={{ opacity: 0, height: "0%" }}
                  enter={{ opacity: 1, height: "100%" }}
                  leave={{ opacity: 0, height: "0%" }}
                >
                  {show =>
                    show &&
                    (props => (
                      <animated.div style={props}>
                        <MovieInfo
                          movie_info={this.state.movie_info}
                          review={this.state.review}
                          trailerId={this.state.trailer}
                        />
                      </animated.div>
                    ))
                  }
                </Transition>
              </section>
            );
          }}
        </Consumer>
      </React.Fragment>
    );
  }
}

export default Featuring;

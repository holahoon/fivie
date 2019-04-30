import React from "react";
import { Spring } from "react-spring/renderprops";
import moment from "moment";
import YouTube from "react-youtube";

import Letters from "./Letters";

// Convert time format
const convertTime = min => {
  let h = Math.floor(min / 60);
  let m = min % 60;
  m = m < 10 ? "0" + m : m;
  return `${h}h ${m}m`;
};

// Display the first data in an object
const displayFirstData = obj => {
  let newArray = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newArray.push(obj[key]);
    }
  }
  const display = newArray.map((item, index) => {
    if (index === 0) {
      return <span key={item.id}>{item.name}</span>;
    }
  });
  return display;
};

// Display the first data in an object
const displayReview = obj => {
  let newArray = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newArray.push(obj[key]);
    }
  }
  const display = newArray.map((item, index) => {
    if (index === 0) {
      // Shrink text if longer than 150
      if (item.content.length > 100)
        for (let i = 95; i > 0; i--) {
          if (
            item.content.charAt(i) === " " &&
            (item.content.charAt(i - 1) !== "," ||
              item.content.charAt(i - 1) !== "." ||
              item.content.charAt(i - 1) !== ";")
          ) {
            // returningContent = item.content.substring(0, i) + "...";
            return item.content.substring(0, i) + "...";
          }
        }
      else return item.content;
    }
  });
  return display;
};

// Display the first data in an object
const displayReviewAuthor = obj => {
  let newArray = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newArray.push(obj[key]);
    }
  }
  const display = newArray.map((item, index) => {
    if (index === 0) {
      return <span key={item.id}>{item.author}</span>;
    }
  });
  return display;
};

// Render ---
const MovieInfo = props => {
  const {
    tagline,
    genres,
    poster_path,
    production_companies,
    release_date,
    runtime,
    title,
    vote_average,
    overview
  } = props.movie_info;

  const { results } = props.review;

  return (
    <React.Fragment>
      <div className="movie-container">
        <div className="info-section">
          <div className="movie-image-container">
            <img
              src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
              alt="movie-image"
            />
          </div>
          <div className="movie-info">
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ delay: 1500 }}
            >
              {props => <h2 style={props}>{title}</h2>}
            </Spring>
            <h3>"{tagline}"</h3>
            <ul className="list-key">
              <li>
                Genre: <span>{displayFirstData(genres)}</span>
              </li>
              <li>
                Released: <span>{moment(release_date).format("YYYY")}</span>
              </li>
              <li>
                Runtime: <span>{convertTime(runtime)}</span>
              </li>
              <li>
                Studio: <span>{displayFirstData(production_companies)}</span>
              </li>
            </ul>
            <div className="line" />
            <div className="rating">
              <h4>
                {vote_average} <span> / 10</span>
              </h4>
              <p className="rating-disclaimer">
                Ratings may vary <br /> from different sites*
              </p>
            </div>
          </div>
          <div className="review-info">
            <div className="review">
              <h3>Review</h3>
              <div>
                <p>{displayReview(results)}</p>
                <h4>-{displayReviewAuthor(results)}</h4>
              </div>
            </div>
            <div className="watch-on">
              <h4>Watch on</h4>
              <ul>
                <li>
                  <a href="https://www.netflix.com/" target="_blank">
                    Netflix
                  </a>
                </li>
                <li>|</li>
                <li>
                  <a
                    href="https://www.amazon.com/Amazon-Video/b/?&node=2858778011&ref=dvm_MLP_ROWNA_US_1"
                    target="_blank"
                  >
                    Prime video
                  </a>
                </li>
                <li>|</li>
                <li>
                  <a href="https://tubitv.com/" target="_blank">
                    Tubi
                  </a>
                </li>
              </ul>
            </div>
            <div className="trailer">
              <h4>Play trailer</h4>
              <YouTube
                className="video"
                videoId={props.trailerId}
                opts={{ height: "135px", width: "240px" }}
              />
            </div>
          </div>
        </div>
        <div className="overview-section">
          <div className="empty-for-overview" />
          <div className="overview-content">
            <div className="red-line" />
            <h6>Overview</h6>
            <p>{overview}</p>
          </div>
        </div>
        <div className="extra-space" />
      </div>
      <Letters />
    </React.Fragment>
  );
};

export default MovieInfo;

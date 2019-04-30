import React from "react";

// Display '...' after certain length of words
const parseText = (text, limit) => {
  if (text.length > limit)
    for (let i = limit; i > 0; i--) {
      if (
        text.charAt(i) === " " &&
        (text.charAt(i - 1) !== "," ||
          text.charAt(i - 1) !== "." ||
          text.charAt(i - 1) !== ";")
      ) {
        return text.substring(0, i) + "...";
      }
    }
  else return text;
};

const MovieLists = props => {
  const { id, title, overview, poster_path, vote_average } = props.movieList;

  return (
    <div className="movie-list">
      <div className="card">
        <div className="image-container">
          <img
            src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
            alt="movie1"
            onClick={() => props.showMovieInfo(id)}
          />
        </div>
        <div className="card-info">
          <h2>{title}</h2>
          <h5>
            <span>{vote_average}</span> out of <span>10</span>
          </h5>
          <p>{parseText(overview, 52)}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieLists;

// Back-ups
// <Link to={`/fivie/info/${id}`}>More info</Link>
// <button onClick={() => props.showMovieInfo(id)}>More info</button>

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import FavoriteIcon from "../../assets/Favorite.svg";

import "./movieCard.styles.scss";

const MovieCard = ({ movie, addToFavourites }) => {
  const { title, id, release_date, poster_path, vote_average } = movie;

  return (
    <article data-testid="movie-card" className="movie-card">
      <Link to={`details/${id}`}>
        <img
          data-testid="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt=""
        />
      </Link>
      <button
        className="movie-card__like-btn"
        onClick={() => addToFavourites(movie)}
      >
        <img src={FavoriteIcon} alt="heart icon" />
      </button>
      <p data-testid="movie-release-date" className="movie-card__release-date">
        {release_date}
      </p>
      <Link to={`details/${id}`}>
        <h3 data-testid="movie-title" className="movie-card__title">
          {title}
        </h3>
      </Link>
      <p className="movie-card__score-wrapper">
        <span>User Score:</span> {Math.floor(vote_average * 10)}
      </p>
    </article>
  );
};

export default MovieCard;

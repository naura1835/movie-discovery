/* eslint-disable react/prop-types */
import "./movieListItem.styles.scss";

const MovieListItem = ({ movie }) => {
  const { title, release_date, poster_path } = movie;
  return (
    <li>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
      <div>
        <h3>{title}</h3>
        <p>{release_date}</p>
      </div>
    </li>
  );
};

export default MovieListItem;
